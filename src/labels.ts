const statusLabels: Record<string, string> = {
  active: "בטיפול",
  on_leave: "בחופשה",
  discharged: "שוחרר",
};

const appointmentLabels: Record<string, string> = {
  pending: "ממתין",
  confirmed: "אושר",
  cancelled: "בוטל",
};

export function statusLabel(status: string) {
  return statusLabels[status] ?? status;
}

export function appointmentStatusLabel(status: string) {
  return appointmentLabels[status] ?? status;
}
