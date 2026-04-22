# @energy-community/auth-service-sdk

SDK de TypeScript/JavaScript para consumir el servicio de autenticaci�n de Energy Community.

## Instalacion

```bash
npm install @energy-community/auth-service-sdk
```
## Uso rapido

```ts
import { AuthServiceSdk } from '@energy-community/auth-service-sdk';

const sdk = new AuthServiceSdk({
  appId: 'tu-app-id',
  apiKey: 'tu-api-key',
});
```

## API disponible

Todas las funciones est�n en `sdk.auth`.

### Registrar usuario

```ts
const tokens = await sdk.auth.register({
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  password: 'StrongPass123!',
});
```

### Login

```ts
const tokens = await sdk.auth.login({
  email: 'ada@example.com',
  password: 'StrongPass123!',
});
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

## Tipos principales

- `RegisterRequest`
- `LoginRequest`
- `RefreshRequest`
- `ValidateTokenRequest`
- `TokensResponse`
- `ValidateTokenResponse`
- `SessionResponse`
- `SuccessResponse`

Tambi�n puedes importarlos directamente:

```ts
import type { TokensResponse, SessionResponse } from '@energy-community/auth-service-sdk';
```

## Manejo de errores

El SDK lanza `AuthServiceSdkError`.

```ts
import { AuthServiceSdkError } from '@energy-community/auth-service-sdk';

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

Adem�s de `appId` y `apiKey`, puedes pasar:

- `fetch`: implementaci�n custom de fetch (�til para tests o runtimes especiales).
- `defaultHeaders`: headers adicionales en todas las requests.

```ts
const sdk = new AuthServiceSdk({
  appId: 'tu-app-id',
  apiKey: 'tu-api-key',
  defaultHeaders: {
    'X-Trace-Id': 'trace-123',
  },
});
```
