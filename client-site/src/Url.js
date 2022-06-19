export default class Url {
    static baseUrl = 'http://localhost:8000/api/';

    static imageUrl = 'http://localhost:8000/';

    static login = `${this.baseUrl}login`;

    static signup = `${this.baseUrl}registration`;

    static verification = `${this.baseUrl}email-verification`;

    static resetVerification = `${this.baseUrl}reset-email-verification`;

    static resetPassword = `${this.baseUrl}reset-password`;

    static contacts = `${this.baseUrl}contacts`;

    static create = `${this.baseUrl}create-contacts`;

    static update = `${this.baseUrl}update-contacts`;

    static delete = `${this.baseUrl}delete-contacts/`;
}
