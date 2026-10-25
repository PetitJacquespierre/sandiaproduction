// 👉 EJECUTA ESTA FUNCIÓN UNA VEZ PARA VERIFICAR QUE TU CUENTA PUEDE ENVIAR CORREOS
function autorizarPermisos() {
  var correo = Session.getActiveUser().getEmail();
  MailApp.sendEmail(correo, "✅ Permiso de Correo Activado", "Los permisos de correo para Sandía Productions han sido autorizados con éxito.");
  Logger.log("Correo de prueba enviado a: " + correo);
}

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var correoDestino = "sandiaproductionss@gmail.com, growstudio.w@gmail.com"; 
  
  try {
    var p = e.parameter;
    if (e.postData && e.postData.contents && e.postData.contents.indexOf("{") === 0) {
      p = JSON.parse(e.postData.contents);
    }
    
    // --- SELECCIÓN DE PESTAÑA SEGÚN EL EVENTO ---
    var nombrePestana = "Rotary 2da";
    if (p.evento === "5K Paraguaná Horror Story") {
      nombrePestana = "5K Paraguaná Horror Story";
    } else if (p.evento === "Coffee Run Terraza 2026") {
      nombrePestana = "Coffee Run Terraza 2026";
    } else if (p.evento === "2da Carrera Caminata 5K End Polio Now" || p.evento === "Rotary 2da") {
      nombrePestana = "Rotary 2da";
    }
    
    var sheet = ss.getSheetByName(nombrePestana) || ss.getSheets()[0];
    var eventoName = p.evento || "5K Paraguaná Horror Story";

    // =========================================================================
    // CANDADO DE SEGURIDAD ESTRICTO (BACKEND GOOGLE APPS SCRIPT):
    // 5K Paraguaná Horror Story tiene inscripciones generales 100% cerradas.
    // ES OBLIGATORIO recibir un cupón o enlace VIP válido para poder registrar en la hoja.
    // =========================================================================
    if (nombrePestana === "5K Paraguaná Horror Story") {
      var cuponValido = p.cupon || p.codigo_cupon || "";
      if (!cuponValido || cuponValido.trim() === "") {
        Logger.log("⛔ Registro rechazado: Intento de inscripción sin cupón VIP en Paraguaná Horror.");
        return ContentService.createTextOutput(JSON.stringify({
          "result": "error",
          "error": "CUPON_OBLIGATORIO",
          "message": "Las inscripciones generales para la 5K Paraguaná Horror Story están 100% agotadas. Se requiere obligatoriamente un código o enlace VIP válido."
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // =========================================================================
    // CASO A: INSCRIPCIÓN GRUPAL (3 O MÁS CORREDORES • $15 USD C/U)
    // Registra a cada corredor en su propia fila individual con su propio dorsal
    // =========================================================================
    if (p.es_grupal === true && p.corredores && p.corredores.length > 0) {
      var filaBase = sheet.getLastRow(); // Si hay cabecera en fila 1, el primer inscrito en fila 2 es #001
      var dorsalesAsignados = [];
      var resumenCorredoresHtml = "";

      for (var i = 0; i < p.corredores.length; i++) {
        var c = p.corredores[i];
        var numDorsal = filaBase + i;
        var dorsalStr = String(numDorsal).padStart(3, '0');
        dorsalesAsignados.push("#" + dorsalStr);

        var filaCorredor;
        if (nombrePestana === "Rotary 2da") {
          filaCorredor = [
            "'" + dorsalStr,                        // Columna A: DORSAL
            new Date(),                             // Columna B: Fecha y Hora
            c.cedula || "",                         // Columna C: Cédula
            c.nombre || "",                         // Columna D: Nombre y Apellido
            c.telefono || "",                       // Columna E: WhatsApp
            c.email || "",                          // Columna F: Correo Electrónico
            c.fecha_nacimiento || "",               // Columna G: Fecha de Nacimiento
            c.genero || "",                         // Columna H: Género
            c.team || "Inscripción Grupal",         // Columna I: Team / Club
            c.metodo_pago || "",                    // Columna J: Forma de Pago
            c.referencia_ref || "",                 // Columna K: Referencia
            c.monto_exacto || c.monto_pago || ""    // Columna L: Monto
          ];
        } else {
          // Estructura exacta para 5K Paraguaná Horror Story y Coffee Run:
          // Col A: Fecha Registro | Col B: Dorsal | Col C: Cédula | Col D: Nombre y Apellido |
          // Col E: WhatsApp | Col F: Email | Col G: Team / Club | Col H: Método de Pago |
          // Col I: Referencia | Col J: Monto Pago
          filaCorredor = [
            new Date(),                             // Columna A: Fecha Registro
            "'" + dorsalStr,                        // Columna B: Dorsal Individual
            c.cedula || "",                         // Columna C: Cédula
            c.nombre || "",                         // Columna D: Nombre y Apellido
            c.telefono || "",                       // Columna E: WhatsApp
            c.email || "",                          // Columna F: Email
            c.team || "Inscripción Grupal",         // Columna G: Team / Club (Identificador Grupal)
            c.metodo_pago || "",                    // Columna H: Método de Pago
            c.referencia_ref || "",                 // Columna I: Referencia (Compartida o Individual)
            c.monto_exacto || c.monto_pago || ""    // Columna J: Monto Pago (15$ deducido)
          ];
        }

        sheet.appendRow(filaCorredor);

        resumenCorredoresHtml += 
          "<div style='background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px; margin-bottom:10px;'>" +
            "<div style='color:#d91e2b; font-weight:bold; font-size:15px;'>🏃 Corredor #" + (i + 1) + " — Dorsal Asignado: #" + dorsalStr + "</div>" +
            "<b>Nombre:</b> " + (c.nombre || "") + " | <b>Cédula:</b> " + (c.cedula || "") + "<br>" +
            "<b>WhatsApp:</b> " + (c.telefono || "") + " | <b>Email:</b> " + (c.email || "") + "<br>" +
            "<b>Team / Club:</b> " + (c.team || "") + "<br>" +
            "<b>Método:</b> " + (c.metodo_pago || "") + " | <b>Ref:</b> " + (c.referencia_ref || "") + "<br>" +
            "<b>Monto:</b> " + (c.monto_exacto || c.monto_pago || "") +
          "</div>";
      }

      // Enviar correo consolidado de la inscripción grupal
      try {
        MailApp.sendEmail({
          to: correoDestino,
          subject: "🍉 NUEVA INSCRIPCIÓN GRUPAL (" + p.corredores.length + " Corredores): " + eventoName + " - " + (p.team_grupo || "Grupo"),
          htmlBody: "<div style='font-family: Arial, sans-serif; max-width: 640px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;'>" +
                    "<h2 style='color: #d91e2b; margin-top: 0;'>🔥 ¡Nueva Inscripción Grupal Recibida! (" + p.corredores.length + " Integrantes)</h2>" +
                    "<p style='font-size: 16px; color: #1e293b; font-weight: bold;'>Evento: " + eventoName + "</p>" +
                    "<p style='font-size: 15px; color: #0f172a;'><b>Team / Grupo:</b> " + (p.team_grupo || "Inscripción Grupal") + "<br>" +
                    "<b>Dorsales Asignados:</b> " + dorsalesAsignados.join(", ") + "</p>" +
                    "<hr style='border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;'>" +
                    "<h3 style='color: #1e293b;'>👥 Detalle Individual de Corredores Registrados</h3>" +
                    resumenCorredoresHtml +
                    "<p style='color: #64748b; font-size: 12px; margin-top: 20px;'>Cada corredor ya fue insertado en su propia fila dentro de la pestaña <b>" + nombrePestana + "</b> en Google Sheets.</p>" +
                    "</div>"
        });
      } catch (errEmailGrupal) {
        Logger.log("Error enviando correo grupal: " + errEmailGrupal);
      }

      return ContentService.createTextOutput(JSON.stringify({
        "result": "success",
        "es_grupal": true,
        "dorsales": dorsalesAsignados
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // =========================================================================
    // CASO B: INSCRIPCIÓN INDIVIDUAL (1 CORREDOR)
    // =========================================================================
    var totalFilas = sheet.getLastRow();
    var numeroDorsal = totalFilas; // El primer inscrito en fila 2 es el #001
    var dorsalFormateado = String(numeroDorsal).padStart(3, '0');
    
    var registro;
    if (nombrePestana === "Rotary 2da") {
      // DORSAL EN COLUMNA A Y FECHA EN COLUMNA B
      registro = [
        "'" + dorsalFormateado,                 // Columna A: DORSAL
        new Date(),                             // Columna B: Fecha y Hora
        p.cedula || "",                         // Columna C: Cédula
        p.nombre || "",                         // Columna D: Nombre y Apellido
        p.telefono || "",                       // Columna E: WhatsApp
        p.email || "",                          // Columna F: Correo Electrónico
        p.fecha_nacimiento || "",               // Columna G: Fecha de Nacimiento
        p.genero || "",                         // Columna H: Género
        p.team || "Independiente",              // Columna I: Grupo
        p.metodo_pago || "",                    // Columna J: Forma de Pago
        p.referencia_ref || "",                 // Columna K: Referencia / Titular
        p.monto_exacto || p.monto_pago || ""    // Columna L: Monto
      ];
    } else {
      // Estructura original para Paraguaná Horror y Coffee Run
      registro = [
        new Date(),                             // Columna A: Fecha Registro
        "'" + dorsalFormateado,                 // Columna B: Dorsal
        p.cedula || "",                         // Columna C: Cédula
        p.nombre || "",                         // Columna D: Nombre y Apellido
        p.telefono || "",                       // Columna E: WhatsApp
        p.email || "",                          // Columna F: Email
        p.team || "",                           // Columna G: Team / Club
        p.metodo_pago || "",                    // Columna H: Método de Pago
        p.referencia_ref || "",                 // Columna I: Referencia
        p.monto_exacto || p.monto_pago || ""    // Columna J: Monto Pago
      ];
    }
    
    sheet.appendRow(registro);
    
    // ==========================================
    // NOTIFICACIÓN POR CORREO INDIVIDUAL
    // ==========================================
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
                  (p.fecha_nacimiento ? "<b>F. Nacimiento:</b> " + p.fecha_nacimiento + "<br>" : "") +
                  (p.genero ? "<b>Género:</b> " + p.genero + "<br>" : "") +
                  "<b>Team / Club:</b> " + (p.team || "Independiente") + "<br>" +
                  "<b>WhatsApp:</b> " + (p.telefono || "") + "<br>" +
                  "<b>Email:</b> " + (p.email || "") + "</p>" +
                  "<hr style='border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;'>" +
                  "<h3 style='color: #1e293b;'>💳 Datos de Pago</h3>" +
                  "<p><b>Forma de Pago:</b> " + (p.metodo_pago || "") + "<br>" +
                  "<b>Monto Reportado:</b> " + (p.monto_exacto || p.monto_pago || "") + "<br>" +
                  "<b>N° Referencia / Titular:</b> " + (p.referencia_ref || "") + "</p>" +
                  "<p style='color: #64748b; font-size: 12px; margin-top: 20px;'>Verifica tu pestaña <b>" + nombrePestana + "</b> en Google Sheets para confirmar al participante.</p>" +
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
