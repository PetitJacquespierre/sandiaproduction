// =============================================================================
// 🎉 CUMPLEAÑOS DE CAROL 3K ("BRILLA EN LA RUTA") — GOOGLE APPS SCRIPT OFICIAL
// Conexión Web App directa a Google Sheets (Grow Studio Agency & Sandía Production)
// =============================================================================
//
// 📌 INSTRUCCIONES DE INSTALACIÓN EN 2 MINUTOS:
//
// 1. Abre Google Sheets en tu navegador (puedes crear una hoja nueva o usar la oficial).
// 2. En el menú superior, haz clic en: Extensiones -> Apps Script.
// 3. Borra todo el código que aparezca y pega este archivo completo.
// 4. Haz clic en "Guardar" (icono de disquete 💾).
// 5. Haz clic en el botón azul "Implementar" (arriba a la derecha) -> "Nueva implementación".
// 6. Selecciona el tipo: "Aplicación web" (icono de engranaje ⚙️).
// 7. En "Quién tiene acceso" (Who has access), selecciona: "Cualquier persona" (Anyone).
// 8. Haz clic en "Implementar" y autoriza los permisos con tu cuenta de Google.
// 9. Copia la URL que termina en "/exec". ¡Esa es tu URL de Web App!
// =============================================================================

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var nombrePestana = "Cumple Carol 3K";
  var sheet = ss.getSheetByName(nombrePestana);
  
  // Si la pestaña no existe, se crea automáticamente con sus cabeceras oficiales
  if (!sheet) {
    sheet = ss.insertSheet(nombrePestana);
    var cabeceras = [
      "Fecha y Hora", 
      "N° Pase / Dorsal", 
      "Nombre", 
      "Apellido", 
      "WhatsApp / Teléfono", 
      "Team / Club", 
      "Confirmación Asistencia", 
      "Mensaje para Carol"
    ];
    sheet.appendRow(cabeceras);
    
    // Formato visual a la fila de cabecera
    var headerRange = sheet.getRange(1, 1, 1, cabeceras.length);
    headerRange.setBackground("#06070e");
    headerRange.setFontColor("#d4ff00");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  try {
    var p = {};
    if (e.postData && e.postData.contents) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (errJson) {
        p = e.parameter || {};
      }
    } else {
      p = e.parameter || {};
    }

    var totalFilas = sheet.getLastRow();
    var dorsalFormateado = p.dorsal || ("#CAROL-" + String(totalFilas).padStart(3, '0'));

    // Registro de fila en la hoja de cálculo
    var fila = [
      new Date(),                                   // Col A: Fecha y Hora
      dorsalFormateado,                             // Col B: Pase / Dorsal
      p.nombre || "",                               // Col C: Nombre
      p.apellido || "",                             // Col D: Apellido
      p.telefono || "",                             // Col E: WhatsApp / Teléfono
      p.team || "Independiente / Amigo de Carol",   // Col F: Team / Club
      p.confirmacion || "SÍ - CONFIRMADO 100%",     // Col G: Confirmación Asistencia
      p.mensaje || ""                               // Col H: Mensaje para Carol
    ];

    sheet.appendRow(fila);

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success",
      "mensaje": "Invitado registrado con éxito para el cumpleaños de Carol",
      "dorsal": dorsalFormateado
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Error al registrar en Google Sheets: " + err);
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error",
      "error": err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
