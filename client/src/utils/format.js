export const CATEGORY_OPTIONS = [
  { label: "Mtb", value: "Mtb" },
  { label: "Road", value: "Road" },
  { label: "City-hybrid", value: "City-hybrid" },
  { label: "E-bike", value: "E-bike" },
  { label: "Touring", value: "Touring" },
  { label: "Folding", value: "Folding" },
  { label: "Gravel", value: "Gravel" },
  { label: "Fixed-gear", value: "Fixed-gear" },
  { label: "Kids", value: "Kids" },
  { label: "Bmx", value: "Bmx" },
  { label: "Fat-bike", value: "Fat-bike" },
  { value: "other", label: "Khác" },
];

export const getCategoryLabel = (value) => {
  const found = CATEGORY_OPTIONS.find((c) => c.value === value);
  return found?.label || value;
};

export const BRAND_OPTIONS = [
  // Top các hãng phổ thông & cao cấp được tìm kiếm nhiều nhất
  { label: "Giant", value: "Giant" },
  { label: "Trek", value: "Trek" },
  { label: "Specialized", value: "Specialized" },
  { label: "Merida", value: "Merida" },
  { label: "Cannondale", value: "Cannondale" },

  // Các hãng phổ biến ở phân khúc tầm trung/giá rẻ tại VN
  { label: "Trinx", value: "Trinx" },
  { label: "Galaxy", value: "Galaxy" },
  { label: "Asama", value: "Asama" },
  { label: "Fornix", value: "Fornix" },
  { label: "Twitter", value: "Twitter" },

  // Phân khúc cao cấp / Châu Âu
  { label: "Scott", value: "Scott" },
  { label: "Canyon", value: "Canyon" },
  { label: "Bianchi", value: "Bianchi" },
  { label: "Cervelo", value: "Cervelo" },
  { label: "Pinarello", value: "Pinarello" },
  { label: "Bmc", value: "Bmc" },
  { label: "Santa-cruz", value: "Santa-cruz" }, // Nổi tiếng về MTB
  { label: "Orbea", value: "Orbea" },
  { label: "Cube", value: "Cube" },
  { label: "Colnago", value: "Colnago" },
  { label: "Brompton", value: "Brompton" }, // Nổi tiếng về xe gấp

  { value: "other", label: "Khác" },
];

export const getBrandLabel = (value) => {
  const found = BRAND_OPTIONS.find((b) => b.value === value);
  return found?.label || value; // fallback nếu là custom
};

export const FRAME_OPTIONS = [
  { value: "Carbon", label: "Carbon" },
  { value: "Nhôm", label: "Nhôm" },
  { value: "Thép", label: "Thép" },
  { value: "Titan", label: "Titan" },
  { value: "Tổng hợp", label: "Tổng hợp" },

  // cho user nhập
  { value: "other", label: "Khác" },
];

export const getFrameLabel = (value) => {
  const found = FRAME_OPTIONS.find((f) => f.value === value);
  return found?.label || value;
};

export const PAINT_OPTIONS = [
  { value: "Như mới", label: "Như mới" },
  { value: "Mòn nhẹ", label: "Mòn nhẹ" },
  { value: "Cần sơn lại", label: "Cần sơn lại" },
  { value: "other", label: "Khác" },
];

export const getPaintLabel = (value) => {
  const found = PAINT_OPTIONS.find((p) => p.value === value);
  return found?.label || value;
};

export const DRIVETRAIN_CONDITION_OPTIONS = [
  { value: "Như mới", label: "Như mới" },
  { value: "Mòn nhẹ", label: "Mòn nhẹ" },
  { value: "Cần thay thayd", label: "Cần thay" },
  { value: "other", label: "Khác" },
];

export const getDrivetrainConditionLabel = (value) => {
  return (
    DRIVETRAIN_CONDITION_OPTIONS.find((o) => o.value === value)?.label || value
  );
};

export const RIM_OPTIONS = [
  { value: "Shimano RS100", label: "Shimano RS100" },
  { value: "DT Swiss R470", label: "DT Swiss R470" },
  { value: "Fulcrum Racing", label: "Fulcrum Racing" },
  { value: "Zipp 303", label: "Zipp 303" },
  { value: "other", label: "Khác" },
];

export const BRAKE_OPTIONS = [
  { value: "Phanh đĩa", label: "Phanh đĩa" },
  { value: "Phanh vành", label: "Phanh vành" },
  { value: "Phanh đùm", label: "Phanh đùm" },
  { value: "other", label: "Khác" },
];

export const getRimLabel = (value) => {
  return RIM_OPTIONS.find((o) => o.value === value)?.label || value;
};

export const getBrakeLabel = (value) => {
  return BRAKE_OPTIONS.find((o) => o.value === value)?.label || value;
};

export const OVERALL_OPTIONS = [
  { value: "Như mới", label: "Như mới" },
  { value: "Tốt", label: "Tốt" },
  { value: "Khá", label: "Khá" },
];

export const getOverallLabel = (value) => {
  return OVERALL_OPTIONS.find((o) => o.value === value)?.label || value;
};
