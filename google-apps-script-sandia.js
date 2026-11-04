// =============================================================================
// SANDÍA PRODUCTION - GOOGLE APPS SCRIPT OFICIAL (SISTEMA UNIFICADO DE EVENTOS)
// Pestañas activas: "Cumple Carol 3K", "5K Paraguaná Horror Story", "Rotary 2da", "Coffee Run Terraza 2026"
// =============================================================================

// 👉 EJECUTA ESTA FUNCIÓN UNA VEZ PARA VERIFICAR PERMISOS DE CORREO
function autorizarPermisos() {
  var correo = Session.getActiveUser().getEmail();
  MailApp.sendEmail(correo, "✅ Permiso de Correo Activado", "Los permisos de correo para Sandía Production han sido autorizados con éxito.");
  Logger.log("Correo de prueba enviado a: " + correo);
}

// =============================================================================
// 🚀 FUNCIÓN DE MIGRACIÓN: MUEVE LOS REGISTROS DE CAROL DESDE HORROR A CUMPLE CAROL 3K
// Ejecuta esta función en Apps Script para pasar las personas inscritas automáticamente
// =============================================================================
function migrarInscripcionesCarol() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetHorror = ss.getSheetByName("5K Paraguaná Horror Story");
  var sheetCarol = ss.getSheetByName("Cumple Carol 3K");

  if (!sheetHorror) {
    Logger.log("❌ No se encontró la pestaña '5K Paraguaná Horror Story'");
    return;
  }
  if (!sheetCarol) {
    sheetCarol = ss.insertSheet("Cumple Carol 3K");
    sheetCarol.appendRow(["Nombre y Apellido", "Teléfono", "Team"]);
  }

  var lastRow = sheetHorror.getLastRow();
  if (lastRow < 2) {
    Logger.log("ℹ️ No hay filas de datos en Horror.");
    return;
  }

  // Leer todos los datos de Paraguaná Horror
  var datos = sheetHorror.getRange(2, 1, lastRow - 1, 10).getValues();
  var filasAMigrar = [];
  var indicesParaBorrar = [];

  // En Horror: Col A (0): Fecha | Col B (1): Dorsal | Col C (2): Cédula | Col D (3): Nombre y Apellido
  // Col E (4): WhatsApp/Teléfono | Col F (5): Email | Col G (6): Team
  for (var i = 0; i < datos.length; i++) {
    var filaNum = i + 2; // Número de fila real en la hoja
    var cedula = (datos[i][2] || "").toString().trim();
    var nombre = (datos[i][3] || "").toString().trim();
    var telefono = (datos[i][4] || "").toString().trim();
    var team = (datos[i][6] || "").toString().trim();
    var metodo = (datos[i][7] || "").toString().trim();
    var ref = (datos[i][8] || "").toString().trim();

    // Identificar si la fila pertenece al cumpleaños de Carol:
    // (Por ejemplo: no tiene cédula, o el método/referencia dice CONFIRMADO, o está en las filas recientes)
    var esCarol = (cedula === "" && nombre !== "") || 
                  (metodo.indexOf("INVITADO") !== -1) || 
                  (ref.indexOf("CONFIRMADO") !== -1) ||
                  (filaNum >= 128);

    if (esCarol && nombre !== "") {
      filasAMigrar.push([nombre, telefono, team || "Independiente / Amigo de Carol"]);
      indicesParaBorrar.push(filaNum);
    }
  }

  if (filasAMigrar.length === 0) {
    Logger.log("ℹ️ No se detectaron registros de Carol pendientes por migrar.");
    return;
  }

  // Insertar las filas en la pestaña 'Cumple Carol 3K' (Columnas: Nombre y Apellido, Teléfono, Team)
  for (var j = 0; j < filasAMigrar.length; j++) {
    sheetCarol.appendRow(filasAMigrar[j]);
    Logger.log("✅ Migrado a Carol 3K: " + filasAMigrar[j][0] + " | " + filasAMigrar[j][1] + " | " + filasAMigrar[j][2]);
  }

  // Borrar de Horror desde abajo hacia arriba para no alterar los índices
  for (var k = indicesParaBorrar.length - 1; k >= 0; k--) {
    sheetHorror.deleteRow(indicesParaBorrar[k]);
  }

  Logger.log("🎉 Migración completada: Se movieron " + filasAMigrar.length + " personas a 'Cumple Carol 3K'.");
}

// =============================================================================
// RECEPTOR PRINCIPAL DE FORMULARIOS WEB (doPost)
// =============================================================================
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var correoDestino = "sandiaproductionss@gmail.com, growstudio.w@gmail.com"; 
  
  try {
    var p = e.parameter || {};
    if (e.postData && e.postData.contents && e.postData.contents.indexOf("{") === 0) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (errJson) {
        Logger.log("Error parseando JSON: " + errJson);
      }
    }
    
    // =========================================================================
    // SELECCIÓN INTELIGENTE DE PESTAÑA (ANTI-FALLOS DE ENCODING Y RUTA EXACTA)
    // =========================================================================
    var evRaw = (p.evento || p.evento_id || p.pestana || "").toString().toLowerCase();

    var nombrePestana = "5K Paraguaná Horror Story"; // Pestaña predeterminada
    var eventoName = "5K Paraguaná Horror Story";

    // 1. CUMPLEAÑOS DE CAROL (PRIORIDAD ALTA PARA EVITAR COLISIONES)
    if (evRaw.indexOf("carol") !== -1 || evRaw.indexOf("cumple") !== -1 || evRaw.indexOf("brilla") !== -1) {
      nombrePestana = "Cumple Carol 3K";
      eventoName = "Brilla en la Ruta - Cumpleaños Carol 3K";
    } else if (evRaw.indexOf("rotary") !== -1 || evRaw.indexOf("polio") !== -1) {
      nombrePestana = "Rotary 2da";
      eventoName = "2da Carrera Caminata 5K End Polio Now";
    } else if (evRaw.indexOf("coffee") !== -1 || evRaw.indexOf("terraza") !== -1) {
      nombrePestana = "Coffee Run Terraza 2026";
      eventoName = "Coffee Run Terraza 2026";
    } else {
      nombrePestana = "5K Paraguaná Horror Story";
      eventoName = "5K Paraguaná Horror Story";
    }
    
    // Búsqueda robusta de la pestaña en la hoja de cálculo
    var sheet = ss.getSheetByName(nombrePestana);
    if (!sheet) {
      var allSheets = ss.getSheets();
      for (var s = 0; s < allSheets.length; s++) {
        var sName = allSheets[s].getName().toLowerCase();
        if (nombrePestana === "Cumple Carol 3K" && (sName.indexOf("carol") !== -1 || sName.indexOf("cumple") !== -1)) {
          sheet = allSheets[s];
          nombrePestana = allSheets[s].getName();
          break;
        } else if (nombrePestana === "5K Paraguaná Horror Story" && (sName.indexOf("horror") !== -1 || sName.indexOf("paraguan") !== -1)) {
          sheet = allSheets[s];
          nombrePestana = allSheets[s].getName();
          break;
        } else if (nombrePestana === "Rotary 2da" && sName.indexOf("rotary") !== -1) {
          sheet = allSheets[s];
          nombrePestana = allSheets[s].getName();
          break;
        }
      }
    }

    // Si aún no existe la pestaña de Carol, se crea con sus 3 columnas exactas
    if (!sheet && nombrePestana === "Cumple Carol 3K") {
      sheet = ss.insertSheet("Cumple Carol 3K");
      sheet.appendRow(["Nombre y Apellido", "Teléfono", "Team"]);
    }
    
    sheet = sheet || ss.getSheets()[0];

    // =========================================================================
    // CASO 1: CUMPLEAÑOS DE CAROL (ESTRUCTURA EXACTA DE 3 COLUMNAS: A, B, C)
    // =========================================================================
    if (nombrePestana === "Cumple Carol 3K") {
      var nombreFinal = p.nombre || p.nombre_completo || "";
      var telefonoFinal = p.telefono || "";
      var teamFinal = p.team || "Independiente / Amigo de Carol";

      // Insertar en Col A: Nombre y Apellido | Col B: Teléfono | Col C: Team
      sheet.appendRow([nombreFinal, telefonoFinal, teamFinal]);

      try {
        MailApp.sendEmail({
          to: correoDestino,
          subject: "🎂 NUEVA ASISTENCIA CONFIRMADA: Cumpleaños Carol 3K - " + nombreFinal,
          htmlBody: "<div style='font-family: Arial, sans-serif; max-width: 550px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;'>" +
                    "<h2 style='color: #ff007f; margin-top: 0;'>🎂 ¡Nueva Asistencia Confirmada!</h2>" +
                    "<p style='font-size: 16px; color: #1e293b; font-weight: bold;'>Evento: Brilla en la Ruta — Carol 3K</p>" +
                    "<p><b>Nombre y Apellido:</b> " + nombreFinal + "<br>" +
                    "<b>Teléfono (WhatsApp):</b> " + telefonoFinal + "<br>" +
                    "<b>Team:</b> " + teamFinal + "</p>" +
                    "<p style='color: #64748b; font-size: 12px; margin-top: 15px;'>Registrado automáticamente en la pestaña <b>Cumple Carol 3K</b>.</p>" +
                    "</div>"
        });
      } catch (errMailCarol) {
        Logger.log("Error enviando correo Carol: " + errMailCarol);
      }

      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "evento": "Cumple Carol 3K",
        "nombre": nombreFinal
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // =========================================================================
    // CASO 2: EVENTOS DEPORTIVOS DE SANDÍA (PARAGUANÁ HORROR, ROTARY, COFFEE)
    // =========================================================================
    var totalFilas = sheet.getLastRow();
    var numeroDorsal = totalFilas;
    var dorsalFormateado = String(numeroDorsal).padStart(3, '0');
    
    var registro;
    if (nombrePestana === "Rotary 2da") {
      registro = [
        "'" + dorsalFormateado,                 // Col A: DORSAL
        new Date(),                             // Col B: Fecha y Hora
        p.cedula || "",                         // Col C: Cédula
        p.nombre || "",                         // Col D: Nombre y Apellido
        p.telefono || "",                       // Col E: WhatsApp
        p.email || "",                          // Col F: Correo Electrónico
        p.fecha_nacimiento || "",               // Col G: Fecha Nacimiento
        p.genero || "",                         // Col H: Género
        p.team || "Independiente",              // Col I: Grupo
        p.metodo_pago || "",                    // Col J: Forma de Pago
        p.referencia_ref || "",                 // Col K: Referencia
        p.monto_exacto || p.monto_pago || ""    // Col L: Monto
      ];
    } else {
      registro = [
        new Date(),                             // Col A: Fecha Registro
        "'" + dorsalFormateado,                 // Col B: Dorsal
        p.cedula || "",                         // Col C: Cédula
        p.nombre || "",                         // Col D: Nombre y Apellido
        p.telefono || "",                       // Col E: WhatsApp
        p.email || "",                          // Col F: Email
        p.team || "",                           // Col G: Team / Club
        p.metodo_pago || "",                    // Col H: Método de Pago
        p.referencia_ref || "",                 // Col I: Referencia
        p.monto_exacto || p.monto_pago || ""    // Col J: Monto Pago
      ];
    }
    
    sheet.appendRow(registro);
    
    try {
      MailApp.sendEmail({
        to: correoDestino,
        subject: "🍉 NUEVA INSCRIPCIÓN: " + eventoName + " - " + (p.nombre || ""),
        htmlBody: "<div style='font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;'>" +
                  "<h2 style='color: #d91e2b; margin-top: 0;'>🔥 ¡Nueva Inscripción Recibida!</h2>" +
                  "<p style='font-size: 16px; color: #1e293b; font-weight: bold;'>Evento: " + eventoName + "</p>" +
                  "<p style='font-size: 20px; color: #d91e2b; font-weight: bold;'>Dorsal Asignado: #" + dorsalFormateado + "</p>" +
                  "<p><b>Atleta:</b> " + (p.nombre || "") + "<br>" +
                  "<b>Cédula:</b> " + (p.cedula || "") + "<br>" +
                  "<b>Team:</b> " + (p.team || "Independiente") + "<br>" +
                  "<b>WhatsApp:</b> " + (p.telefono || "") + "</p>" +
                  "</div>"
      });
    } catch (errEmail) { 
      Logger.log("Error enviando correo: " + errEmail);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      "result": "success", 
      "dorsal": dorsalFormateado
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error", 
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
