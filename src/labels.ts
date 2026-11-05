const statusLabels: Record<string, string> = {
  active: "בטיפול",
  on_leave: "בחופשה",
  discharged: "שוחרר",
};

export function statusLabel(status: string) {
  return statusLabels[status] ?? status;
}
