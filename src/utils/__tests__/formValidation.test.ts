import formValidation from "@/utils/formValidation";

describe("formValidation", () => {
  it("should return false if required fields are empty", () => {
    const result = formValidation({
      user_name: "",
      user_email: "test@example.com",
      message: "Hello",
      company_url_confirm: "",
    });
    expect(result).toBe(false);
  });

  it("should return false if email is invalid", () => {
    const result = formValidation({
      user_name: "John",
      user_email: "invalid-email",
      message: "Hello",
      company_url_confirm: "",
    });
    expect(result).toBe(false);
  });

  it("should return true if all fields are valid", () => {
    const result = formValidation({
      user_name: "John Doe",
      user_email: "john@example.com",
      message: "This is a test message",
      company_url_confirm: "",
    });
    expect(result).toBe(true);
  });

  it("should return true if honeypot is filled (spam check)", () => {
    const result = formValidation({
      user_name: "John Doe",
      user_email: "john@example.com",
      message: "This is a test message",
      company_url_confirm: "http://example.com",
    });
    // Honeypot filled = spam, should still validate locally but BE will catch it
    expect(result).toBe(true);
  });
});
