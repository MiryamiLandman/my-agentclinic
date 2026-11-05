import { describe, expect, it } from "vitest";
import { appointmentStatusLabel, statusLabel } from "../src/labels";

describe("Hebrew labels", () => {
  it("translates an animal status", () => {
    expect(statusLabel("active")).toBe("בטיפול");
    expect(statusLabel("on_leave")).toBe("בחופשה");
    expect(statusLabel("discharged")).toBe("שוחרר");
  });

  it("translates an appointment status", () => {
    expect(appointmentStatusLabel("pending")).toBe("ממתין");
    expect(appointmentStatusLabel("confirmed")).toBe("אושר");
    expect(appointmentStatusLabel("cancelled")).toBe("בוטל");
  });
});
