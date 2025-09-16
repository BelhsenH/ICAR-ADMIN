import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtKeycloakTokenService {

  constructor() {
  }

  hasKeycloakRealmRole(token: string, role: string): boolean {
    const tokenParsed = this.decodeToken(token);
    const realmAccess = tokenParsed.realm_access;
    return (!!realmAccess && realmAccess.roles.indexOf(role) >= 0);
  }

  private decodeToken(token: any) {
    const [header, payload] = token.split(".");

    if (typeof payload !== "string") {
      throw new Error("Unable to decode token, payload not found.");
    }

    let decoded;

    try {
      decoded = this.base64UrlDecode(payload);
    } catch (error) {
      throw new Error("Unable to decode token, payload is not a valid Base64URL value.");
    }

    try {
      return JSON.parse(decoded);
    } catch (error) {
      throw new Error("Unable to decode token, payload is not a valid JSON value.");
    }
  }

  private base64UrlDecode(input: any) {
    let output = input
      .replaceAll("-", "+")
      .replaceAll("_", "/");

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("Input is not of the correct length.");
    }

    try {
      return this.b64DecodeUnicode(output);
    } catch (error) {
      return atob(output);
    }
  }

  private b64DecodeUnicode(input: any) {
    return decodeURIComponent(atob(input).replace(/(.)/g, (m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();

      if (code.length < 2) {
        code = "0" + code;
      }

      return "%" + code;
    }));
  }

}
