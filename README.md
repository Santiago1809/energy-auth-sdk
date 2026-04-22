# energy-community-auth-sdk

SDK de TypeScript/JavaScript para consumir el servicio de autenticaci�n de Energy Community.

## Instalacion

```bash
npm i energy-community-auth-sdk
```
## Uso rapido

```ts
import { AuthServiceSdk } from 'npm i energy-community-auth-sdk';

const sdk = new AuthServiceSdk({
  appId: 'tu-app-id',
  apiKey: 'tu-api-key',
});
```

## API disponible

Todas las funciones están en `sdk.auth`.

### Registrar usuario

```ts
const registration = await sdk.auth.register({
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  password: 'StrongPass123!',
});

console.log(registration.user.id, registration.user.email);
```

### Login

```ts
const loginResult = await sdk.auth.login({
  email: 'ada@example.com',
  password: 'StrongPass123!',
});

console.log(loginResult.user.id, loginResult.user.email);
```

### Refresh token

```ts
const tokens = await sdk.auth.refresh({
  refreshToken: tokens.refreshToken,
});
```

### Validar token

```ts
const result = await sdk.auth.validate({
  accessToken: tokens.accessToken,
});
```

### Logout

```ts
await sdk.auth.logout(tokens.accessToken);
```

### Listar sesiones

```ts
const sessions = await sdk.auth.sessions(tokens.accessToken);
```

### Revocar una sesion

```ts
await sdk.auth.revokeSession(tokens.accessToken, 'session-id');
```

### Consultar usuario por id

```ts
const user = await sdk.auth.getUserById('8db5f3bb-4f87-4a31-89fc-351b8eb6360c');
```

## Tipos principales

- `RegisterRequest`
- `LoginRequest`
- `RefreshRequest`
- `ValidateTokenRequest`
- `UserResponse`
- `RegisterResponse`
- `LoginResponse`
- `TokensResponse`
- `ValidateTokenResponse`
- `SessionResponse`
- `SuccessResponse`

También puedes importarlos directamente:

```ts
import type { TokensResponse, SessionResponse } from 'energy-community-auth-sdk';
```

## Manejo de errores

El SDK lanza `AuthServiceSdkError`.

```ts
import { AuthServiceSdkError } from 'energy-community-auth-sdk';

try {
  await sdk.auth.login({ email: 'x@y.com', password: 'bad-pass' });
} catch (error) {
  if (error instanceof AuthServiceSdkError) {
    console.error(error.code);   // HTTP_ERROR | NETWORK_ERROR | INVALID_RESPONSE
    console.error(error.status); // status HTTP si aplica
    console.error(error.payload); // payload de error del backend si aplica
  }
}
```

## Opciones avanzadas

Además de `appId` y `apiKey`, puedes pasar:
- `local_test`: si es `true`, usa `http://localhost:3000` como host base.
- `defaultHeaders`: headers adicionales en todas las requests.

```ts
const sdk = new AuthServiceSdk({
  appId: 'tu-app-id',
  apiKey: 'tu-api-key',
  local_test: true,
  defaultHeaders: {
    'X-Trace-Id': 'trace-123',
  },
});
```
