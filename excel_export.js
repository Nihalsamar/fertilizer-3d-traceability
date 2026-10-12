/**
 * ============================================================================
 * KisanTrace 3D: Excel & CSV Export Generator (SpreadsheetML & Tabular Builder)
 * Generates Native Multi-Sheet Excel XML (.xls/.xml) and CSV Workbooks
 * Zero External Dependencies, 100% Compatible with MS Excel, LibreOffice & Google Sheets
 * ============================================================================
 */

function escapeXml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildWorksheetXml(sheetName, columns, rows) {
  let xml = `  <Worksheet ss:Name="${escapeXml(sheetName)}">\n`;
  xml += `    <Table>\n`;

  // Define column widths
  columns.forEach(col => {
    const width = col.width || 120;
    xml += `      <Column ss:Width="${width}"/>\n`;
  });

  // Header row
  xml += `      <Row ss:Height="24">\n`;
  columns.forEach(col => {
    xml += `        <Cell ss:StyleID="Header"><Data ss:Type="String">${escapeXml(col.title)}</Data></Cell>\n`;
  });
  xml += `      </Row>\n`;

  // Data rows
  rows.forEach((row, idx) => {
    const isAlt = idx % 2 === 1;
    xml += `      <Row ss:Height="18">\n`;
    columns.forEach(col => {
      const val = col.accessor ? col.accessor(row) : row[col.key];
      const styleId = col.getStyle ? col.getStyle(row, val) : (isAlt ? 'AltRow' : 'Normal');

      if (val === null || val === undefined || val === '') {
        xml += `        <Cell ss:StyleID="${styleId}"><Data ss:Type="String">-</Data></Cell>\n`;
      } else if (typeof val === 'number') {
        xml += `        <Cell ss:StyleID="${styleId}"><Data ss:Type="Number">${val}</Data></Cell>\n`;
      } else {
        xml += `        <Cell ss:StyleID="${styleId}"><Data ss:Type="String">${escapeXml(val)}</Data></Cell>\n`;
      }
    });
    xml += `      </Row>\n`;
  });

  xml += `    </Table>\n`;
  xml += `  </Worksheet>\n`;
  return xml;
}

function generateExcelXml(data) {
  const { telemetry = [], batches = [], custody = [], dbt = [], reverse_flow = [], packaging = [] } = data;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?mso-application progid="Excel.Sheet"?>\n`;
  xml += `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n`;
  xml += ` xmlns:o="urn:schemas-microsoft-com:office:office"\n`;
  xml += ` xmlns:x="urn:schemas-microsoft-com:office:excel"\n`;
  xml += ` xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n`;
  xml += ` xmlns:html="http://www.w3.org/TR/REC-html40">\n`;

  // Workbook Styles
  xml += `  <Styles>\n`;
  xml += `    <Style ss:ID="Default" ss:Name="Normal">\n`;
  xml += `      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1E293B"/>\n`;
  xml += `      <Alignment ss:Vertical="Center"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="Header">\n`;
  xml += `      <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>\n`;
  xml += `      <Interior ss:Color="#047857" ss:Pattern="Solid"/>\n`;
  xml += `      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="Normal">\n`;
  xml += `      <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#0F172A"/>\n`;
  xml += `      <Alignment ss:Vertical="Center"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="AltRow">\n`;
  xml += `      <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#0F172A"/>\n`;
  xml += `      <Interior ss:Color="#F0FDF4" ss:Pattern="Solid"/>\n`;
  xml += `      <Alignment ss:Vertical="Center"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="BreachStyle">\n`;
  xml += `      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#991B1B"/>\n`;
  xml += `      <Interior ss:Color="#FEE2E2" ss:Pattern="Solid"/>\n`;
  xml += `      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="CompliantStyle">\n`;
  xml += `      <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#166534"/>\n`;
  xml += `      <Interior ss:Color="#DCFCE7" ss:Pattern="Solid"/>\n`;
  xml += `      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n`;
  xml += `    </Style>\n`;
  xml += `  </Styles>\n`;

  // 1. Telemetry Sheet
  const telemetryColumns = [
    { title: 'Log ID', key: 'id', width: 60 },
    { title: 'Recorded Timestamp (UTC)', key: 'recorded_at', width: 150 },
    { title: 'Batch ID', key: 'batch_id', width: 160 },
    { title: 'Node Index', key: 'node_index', width: 75 },
    { title: 'Node / Facility Name', key: 'node_name', width: 170 },
    { title: 'Latitude (°N/S)', key: 'latitude', width: 95 },
    { title: 'Longitude (°E/W)', key: 'longitude', width: 95 },
    { title: 'Decimal Latitude', key: 'decimal_latitude', width: 105 },
    { title: 'Decimal Longitude', key: 'decimal_longitude', width: 105 },
    { title: 'Raw GPS Coordinates', key: 'gps_coordinates', width: 130 },
    { title: 'Temperature (°C)', key: 'temperature', width: 105 },
    { title: 'Humidity (%)', key: 'humidity', width: 95 },
    {
      title: 'Compliance Status',
      accessor: r => r.is_breached ? 'BREACHED' : 'COMPLIANT',
      getStyle: r => r.is_breached ? 'BreachStyle' : 'CompliantStyle',
      width: 120
    },
    { title: 'Status Note / Condition', key: 'status_note', width: 180 }
  ];
  xml += buildWorksheetXml('IoT_Telemetry_Logs', telemetryColumns, telemetry);

  // 2. Batches Sheet
  const batchColumns = [
    { title: 'Batch ID', key: 'id', width: 160 },
    { title: 'Batch Number', key: 'batch_number', width: 110 },
    { title: 'Fertilizer Formulation', key: 'formulation', width: 180 },
    { title: 'Nitrogen (% N)', key: 'nitrogen_pct', width: 95 },
    { title: 'Moisture (%)', key: 'moisture_pct', width: 95 },
    { title: 'Biuret (%)', key: 'biuret_pct', width: 90 },
    { title: 'Total Quantity (Bags)', key: 'quantity_bags', width: 120 },
    { title: 'Total Weight (MT)', key: 'total_weight_mt', width: 110 },
    { title: 'Manufacturer Name', key: 'manufacturer_name', width: 180 },
    { title: 'Plant Latitude', key: 'plant_latitude', width: 95 },
    { title: 'Plant Longitude', key: 'plant_longitude', width: 95 },
    { title: 'Plant GPS (Raw)', key: 'plant_gps', width: 120 },
    { title: 'Genesis Tx Hash', key: 'genesis_tx_hash', width: 220 },
    { title: 'QC Certificate Hash', key: 'qc_cert_hash', width: 220 },
    { title: 'Batch Status', key: 'status', width: 85 },
    { title: 'Created Timestamp', key: 'created_at', width: 140 }
  ];
  xml += buildWorksheetXml('Batches_Master', batchColumns, batches);

  // 3. Custody Chain Sheet
  const custodyColumns = [
    { title: 'Hop ID', key: 'id', width: 60 },
    { title: 'Batch ID', key: 'batch_id', width: 160 },
    { title: 'Stage #', key: 'stage_number', width: 65 },
    { title: 'From Entity', key: 'from_entity', width: 160 },
    { title: 'To Entity', key: 'to_entity', width: 160 },
    { title: 'Location Name', key: 'location_name', width: 150 },
    { title: 'Carrier Vehicle ID', key: 'carrier_vehicle_id', width: 130 },
    { title: 'Blockchain Tx Hash', key: 'tx_hash', width: 200 },
    { title: 'Offline Signed Flag', key: 'is_offline_signed', width: 110 },
    { title: 'Verification Timestamp', key: 'verified_at', width: 150 }
  ];
  xml += buildWorksheetXml('Custody_Chain', custodyColumns, custody);

  // 4. DBT Disbursements Sheet
  const dbtColumns = [
    { title: 'Disbursement ID', key: 'id', width: 120 },
    { title: 'Batch ID', key: 'batch_id', width: 160 },
    { title: 'Bag Code (QR)', key: 'bag_code', width: 160 },
    { title: 'Farmer Name', key: 'farmer_name', width: 160 },
    { title: 'Aadhaar SHA-256 Hash', key: 'farmer_aadhaar_hash', width: 220 },
    { title: 'Bank Account (Last 4)', key: 'bank_account_last4', width: 130 },
    { title: 'Subsidy Amount (INR ₹)', key: 'subsidy_amount', width: 140 },
    { title: 'Verification Channel', key: 'verification_channel', width: 150 },
    { title: 'Disbursement Status', key: 'status', width: 120 },
    { title: 'Disbursed Timestamp', key: 'disbursed_at', width: 150 }
  ];
  xml += buildWorksheetXml('DBT_Disbursements', dbtColumns, dbt);

  // 5. Reverse Flow Recalls Sheet
  const reverseColumns = [
    { title: 'Recall Event ID', key: 'id', width: 95 },
    { title: 'Batch ID', key: 'batch_id', width: 160 },
    { title: 'Triggering Node', key: 'trigger_node', width: 160 },
    { title: 'Breach Reason', key: 'reason', width: 220 },
    { title: 'Trigger Temp (°C)', key: 'trigger_temperature', width: 110 },
    { title: 'Trigger Humidity (%)', key: 'trigger_humidity', width: 120 },
    { title: 'Return Route', key: 'return_route', width: 200 },
    { title: 'Return Waybill', key: 'return_waybill', width: 150 },
    { title: 'Quarantined Timestamp', key: 'quarantined_at', width: 150 }
  ];
  xml += buildWorksheetXml('Reverse_Flow_Recalls', reverseColumns, reverse_flow);

  // 6. Packaging Hierarchy Sheet
  const packagingColumns = [
    { title: 'Package ID', key: 'id', width: 120 },
    { title: 'Batch ID', key: 'batch_id', width: 160 },
    { title: 'Packaging Level', key: 'level', width: 120 },
    { title: 'Serialization Code', key: 'code', width: 180 },
    { title: 'Parent Container Code', key: 'parent_code', width: 180 },
    { title: 'RFID EPC', key: 'rfid_epc', width: 160 },
    { title: 'Merkle Root Hash', key: 'merkle_root', width: 220 },
    { title: 'Weight (kg)', key: 'weight_kg', width: 90 },
    { title: 'Created Timestamp', key: 'created_at', width: 140 }
  ];
  xml += buildWorksheetXml('Packaging_Hierarchy', packagingColumns, packaging);

  xml += `</Workbook>\n`;
  return xml;
}

function escapeCsvField(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function generateTelemetryCsv(telemetryList) {
  const headers = [
    'Log_ID',
    'Recorded_Timestamp_UTC',
    'Batch_ID',
    'Node_Index',
    'Node_Name',
    'Latitude',
    'Longitude',
    'Decimal_Latitude',
    'Decimal_Longitude',
    'Raw_GPS_Coordinates',
    'Temperature_Celsius',
    'Humidity_Percent',
    'Compliance_Status',
    'Status_Note'
  ];

  const lines = [headers.join(',')];

  telemetryList.forEach(r => {
    const row = [
      escapeCsvField(r.id),
      escapeCsvField(r.recorded_at),
      escapeCsvField(r.batch_id),
      escapeCsvField(r.node_index),
      escapeCsvField(r.node_name),
      escapeCsvField(r.latitude),
      escapeCsvField(r.longitude),
      escapeCsvField(r.decimal_latitude),
      escapeCsvField(r.decimal_longitude),
      escapeCsvField(r.gps_coordinates),
      escapeCsvField(r.temperature),
      escapeCsvField(r.humidity),
      escapeCsvField(r.is_breached ? 'BREACHED' : 'COMPLIANT'),
      escapeCsvField(r.status_note)
    ];
    lines.push(row.join(','));
  });

  return lines.join('\r\n');
}

module.exports = {
  generateExcelXml,
  generateTelemetryCsv
};
