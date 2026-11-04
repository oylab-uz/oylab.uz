import { describe, expect, it } from "vitest";
import { isAdminHost } from "./hosts";

describe("isAdminHost", () => {
  it("recognises the production admin host", () => {
    expect(isAdminHost("admin.oylab.uz")).toBe(true);
  });
  it("recognises admin.localhost with a port in development", () => {
    expect(isAdminHost("admin.localhost:3000")).toBe(true);
    expect(isAdminHost("admin.localhost")).toBe(true);
  });
  it("rejects the public host, look-alikes and missing hosts", () => {
    expect(isAdminHost("oylab.uz")).toBe(false);
    expect(isAdminHost("admin.oylab.uz.evil.com")).toBe(false);
    expect(isAdminHost("xadmin.oylab.uz")).toBe(false);
    expect(isAdminHost(null)).toBe(false);
  });
});
