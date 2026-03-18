export const CATEGORY_OPTIONS = [
  // ===== ROAD =====
  { value: "road_standard", label: "Xe đạp đua tiêu chuẩn" },
  { value: "road_aero", label: "Xe đạp đua khí động học (Aero)" },
  { value: "road_endurance", label: "Xe đạp đua đường dài (Endurance)" },
  { value: "road_tt", label: "Xe đạp 3 môn phối hợp (Triathlon/TT)" },

  // ===== MTB =====
  { value: "mtb_xc", label: "Xe đạp địa hình băng đồng (XC)" },
  { value: "mtb_trail", label: "Xe đạp địa hình Trail" },
  { value: "mtb_enduro", label: "Xe đạp địa hình Enduro" },
  { value: "mtb_downhill", label: "Xe đạp địa hình đổ đèo (Downhill)" },

  // ===== OTHER =====
  { value: "gravel", label: "Xe đạp đường hỗn hợp (Gravel)" },
  { value: "touring", label: "Xe đạp đường dài (Touring)" },
  { value: "bmx", label: "Xe đạp biểu diễn (BMX)" },
  { value: "fixed", label: "Xe đạp líp chết (Fixed Gear)" },
  { value: "city", label: "Xe đạp đô thị / thể dục (City / Hybrid)" },
  { value: "fat", label: "Xe đạp bánh béo (Fat Bike)" },
  { value: "ebike", label: "Xe đạp trợ lực điện (E-Bike)" },

  { value: "other", label: "Khác" },
];

export const getCategoryLabel = (value) => {
  const found = CATEGORY_OPTIONS.find((c) => c.value === value);
  return found?.label || value;
};

export const BRAND_OPTIONS = [
  { value: "giant", label: "Giant" },
  { value: "trek", label: "Trek" },
  { value: "specialized", label: "Specialized" },
  { value: "merida", label: "Merida" },
  { value: "twitter", label: "Twitter" },
  { value: "java", label: "Java" },
  { value: "trinx", label: "Trinx" },
  { value: "asama", label: "Asama" },
  { value: "martin", label: "Martin" },
  { value: "thongnhat", label: "Thống Nhất" },

  { value: "cannondale", label: "Cannondale" },
  { value: "cube", label: "Cube" },
  { value: "scott", label: "Scott" },
  { value: "bmc", label: "BMC" },
  { value: "fuji", label: "Fuji" },
  { value: "polygon", label: "Polygon" },
  { value: "orbea", label: "Orbea" },
  { value: "kona", label: "Kona" },
  { value: "gt", label: "GT" },
  { value: "norco", label: "Norco" },

  { value: "pinarello", label: "Pinarello" },
  { value: "cervelo", label: "Cervelo" },
  { value: "colnago", label: "Colnago" },
  { value: "factor", label: "Factor" },
  { value: "look", label: "Look" },
  { value: "time", label: "Time" },
  { value: "bianchi", label: "Bianchi" },
  { value: "wilier", label: "Wilier" },
  { value: "santacruz", label: "Santa Cruz" },
  { value: "yt", label: "YT Industries" },

  { value: "other", label: "Khác" },
];

export const getBrandLabel = (value) => {
  const found = BRAND_OPTIONS.find((b) => b.value === value);
  return found?.label || value; // fallback nếu là custom
};

export const FRAME_OPTIONS = [
  { value: "carbon", label: "Carbon" },
  { value: "aluminum", label: "Nhôm" },
  { value: "steel", label: "Thép" },
];

export const getFrameLabel = (value) => {
  const found = FRAME_OPTIONS.find((f) => f.value === value);
  return found?.label || value;
};

export const PAINT_OPTIONS = [
  { value: "new", label: "Như mới" },
  { value: "light_scratch", label: "Mòn nhẹ" },
  { value: "repaint", label: "Cần sơn lại" },
];

export const getPaintLabel = (value) => {
  const found = PAINT_OPTIONS.find((p) => p.value === value);
  return found?.label || value;
};

export const DRIVETRAIN_CONDITION_OPTIONS = [
  { value: "new", label: "Như mới" },
  { value: "good", label: "Mòn nhẹ" },
  { value: "bad", label: "Cần thay" },
];

export const getDrivetrainConditionLabel = (value) => {
  return (
    DRIVETRAIN_CONDITION_OPTIONS.find((o) => o.value === value)?.label || value
  );
};

export const RIM_OPTIONS = [
  { value: "shimano_rs100", label: "Shimano RS100" },
  { value: "dt_r470", label: "DT Swiss R470" },
  { value: "fulcrum_racing", label: "Fulcrum Racing" },
  { value: "zipp_303", label: "Zipp 303" },
  { value: "other", label: "Khác" },
];

export const BRAKE_OPTIONS = [
  { value: "disc", label: "Phanh đĩa" },
  { value: "rim", label: "Phanh vành" },
];

export const getRimLabel = (value) => {
  return RIM_OPTIONS.find((o) => o.value === value)?.label || value;
};

export const getBrakeLabel = (value) => {
  return BRAKE_OPTIONS.find((o) => o.value === value)?.label || value;
};

export const OVERALL_OPTIONS = [
  { value: "new", label: "Như mới" },
  { value: "good", label: "Tốt" },
  { value: "fair", label: "Khá" },
];

export const getOverallLabel = (value) => {
  return OVERALL_OPTIONS.find((o) => o.value === value)?.label || value;
};
