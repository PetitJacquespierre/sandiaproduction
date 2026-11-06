// =============================================================================
// SANDÍA PRODUCTION - GOOGLE APPS SCRIPT OFICIAL (SISTEMA UNIFICADO DE EVENTOS)
// Pestañas activas: "Cumple Carol 3K", "5K Paraguaná Horror Story", "Rotary 2da", "Coffee Run Terraza 2026"
// =============================================================================

function autorizarPermisos() {
  var correo = Session.getActiveUser().getEmail();
  MailApp.sendEmail(correo, "✅ Permiso de Correo Activado", "Los permisos de correo para Sandía Production han sido autorizados con éxito.");
  Logger.log("Correo de prueba enviado a: " + correo);
}

// =============================================================================
// 🚀 FUNCIÓN DE MIGRACIÓN: MUEVE LOS REGISTROS DE CAROL DESDE HORROR A CUMPLE CAROL 3K
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
    sheetCarol.appendRow(["#", "Nombre y Apellido", "Teléfono", "Team"]);
  }

  var lastRow = sheetHorror.getLastRow();
  if (lastRow < 2) {
    Logger.log("ℹ️ No hay filas de datos en Horror.");
    return;
  }

  var datos = sheetHorror.getRange(2, 1, lastRow - 1, 10).getValues();
  var filasAMigrar = [];
  var indicesParaBorrar = [];

  for (var i = 0; i < datos.length; i++) {
    var filaNum = i + 2;
    var cedula = (datos[i][2] || "").toString().trim();
    var nombre = (datos[i][3] || "").toString().trim();
    var telefono = (datos[i][4] || "").toString().trim();
    var team = (datos[i][6] || "").toString().trim();

    var esCarol = (cedula === "" && nombre !== "") || (filaNum >= 128);

    if (esCarol && nombre !== "") {
      filasAMigrar.push([nombre, telefono, team || "Independiente / Amigo de Carol"]);
      indicesParaBorrar.push(filaNum);
    }
  }

  if (filasAMigrar.length === 0) {
    Logger.log("ℹ️ No se detectaron registros de Carol pendientes.");
    return;
  }

  // Insertar con contador en Col A: # | Col B: Nombre y Apellido | Col C: Teléfono | Col D: Team
  for (var j = 0; j < filasAMigrar.length; j++) {
    var numInvitado = sheetCarol.getLastRow();
    sheetCarol.appendRow([numInvitado, filasAMigrar[j][0], filasAMigrar[j][1], filasAMigrar[j][2]]);
    Logger.log("✅ Migrado a Carol 3K #" + numInvitado + ": " + filasAMigrar[j][0]);
  }

  for (var k = indicesParaBorrar.length - 1; k >= 0; k--) {
    sheetHorror.deleteRow(indicesParaBorrar[k]);
  }

  Logger.log("🎉 Migración completada.");
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
    // SELECCIÓN INTELIGENTE DE PESTAÑA
    // =========================================================================
    var evRaw = (p.evento || p.evento_id || p.pestana || "").toString().toLowerCase();

    var nombrePestana = "5K Paraguaná Horror Story";
    var eventoName = "5K Paraguaná Horror Story";

    // 1. CUMPLEAÑOS DE CAROL (PRIORIDAD N° 1)
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
    
    var sheet = ss.getSheetByName(nombrePestana);
    if (!sheet && nombrePestana === "Cumple Carol 3K") {
      sheet = ss.insertSheet("Cumple Carol 3K");
      sheet.appendRow(["#", "Nombre y Apellido", "Teléfono", "Team"]);
    }
    sheet = sheet || ss.getSheets()[0];

    // =========================================================================
    // CASO 1: CUMPLEAÑOS DE CAROL (COLUMNA A: CONTADOR 1, 2, 3...)
    // Col A: # | Col B: Nombre y Apellido | Col C: Teléfono | Col D: Team
    // =========================================================================
    if (nombrePestana === "Cumple Carol 3K") {
      // 🔒 CANDADO 2 (BACKEND APPS SCRIPT): CIERRE OFICIAL DE ASISTENCIA
      var INSCRIPCIONES_CAROL_CERRADAS = true;
      if (INSCRIPCIONES_CAROL_CERRADAS) {
        Logger.log("⛔ Registro rechazado: Las confirmaciones para Cumple Carol 3K están cerradas oficialmente.");
        return ContentService.createTextOutput(JSON.stringify({
          "status": "closed",
          "message": "Las confirmaciones para el Cumpleaños de Carol 3K han cerrado oficialmente. Cupos al 100%."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      var nombreFinal = p.nombre || p.nombre_completo || "";
      var telefonoFinal = p.telefono || "";
      var teamFinal = p.team || "Independiente / Amigo de Carol";

      // Contador correlativo automático: si hay cabecera en fila 1, la fila 2 es #1, fila 3 es #2, etc.
      var numeroInvitado = sheet.getLastRow(); 

      // Inserta en: Col A (#) | Col B (Nombre y Apellido) | Col C (Teléfono) | Col D (Team)
      sheet.appendRow([numeroInvitado, nombreFinal, telefonoFinal, teamFinal]);

      try {
        MailApp.sendEmail({
          to: correoDestino,
          subject: "🎂 NUEVA ASISTENCIA CONFIRMADA #" + numeroInvitado + ": Cumpleaños Carol 3K - " + nombreFinal,
          htmlBody: "<div style='font-family: Arial, sans-serif; max-width: 550px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;'>" +
                    "<h2 style='color: #ff007f; margin-top: 0;'>🎂 ¡Nuevo Invitado Confirmado #" + numeroInvitado + "!</h2>" +
                    "<p style='font-size: 16px; color: #1e293b; font-weight: bold;'>Evento: Brilla en la Ruta — Carol 3K</p>" +
                    "<p><b>N° Asistente:</b> #" + numeroInvitado + "<br>" +
                    "<b>Nombre y Apellido:</b> " + nombreFinal + "<br>" +
                    "<b>Teléfono (WhatsApp):</b> " + telefonoFinal + "<br>" +
                    "<b>Team:</b> " + teamFinal + "</p>" +
                    "<p style='color: #64748b; font-size: 12px; margin-top: 15px;'>Registrado automáticamente en la pestaña <b>Cumple Carol 3K</b>.</p>" +
                    "</div>"
        });
      } catch (errMailCarol) {}

      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "evento": "Cumple Carol 3K",
        "numero": numeroInvitado,
        "nombre": nombreFinal
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // =========================================================================
    // CASO 2: DEMÁS EVENTOS DEPORTIVOS DE SANDÍA (BASE DE DATOS REGULAR)
    // =========================================================================
    var totalFilas = sheet.getLastRow();
    var dorsalFormateado = String(totalFilas).padStart(3, '0');
    
    var registro = [
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
    
    sheet.appendRow(registro);
    
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
