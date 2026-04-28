# energy-community-auth-sdk

SDK de TypeScript/JavaScript para consumir el servicio de autenticación de Energy Community.

## Instalacion

```bash
npm i energy-community-auth-sdk
```
## Uso rapido

```ts
import { AuthServiceSdk } from 'energy-community-auth-sdk';

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

### Solicitar recuperación de contraseña

Envía un correo con un enlace para restablecer la contraseña.

```ts
await sdk.auth.requestPasswordRecovery({
  email: 'usuario@example.com',
});
```

**Nota:** Por seguridad, siempre devuelve éxito aunque el email no exista (para evitar enumeración).

### Validar token de recuperación

Verifica si un token de recuperación es válido y no ha sido usado.

```ts
const validation = await sdk.auth.validateRecoveryToken({
  token: 'jwt-token-recibido',
});

if (validation.valid) {
  console.log('Token válido para:', validation.email);
} else {
  console.log('Token inválido o ya usado');
}
```

### Restablecer contraseña

Actualiza la contraseña usando un token válido.

```ts
await sdk.auth.resetPassword({
  token: 'jwt-token-recibido',
  password: 'NuevaContraseña123!',
});
```

**Nota:** Al restablecer la contraseña, todas las sesiones activas se revocan automáticamente por seguridad.

## Tipos principales

- `RequestPasswordRecoveryRequest`
- `ValidateRecoveryTokenRequest`
- `ValidateRecoveryTokenResponse`
- `ResetPasswordRequest`
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

El SDK lanza errores simples con `status` y `message`:

```ts
import { AuthServiceSdkError } from 'energy-community-auth-sdk';

try {
  await sdk.auth.login({ email: 'x@y.com', password: 'bad-pass' });
} catch (error) {
  if (error instanceof AuthServiceSdkError) {
    console.error('Status:', error.status);   // ej: 401
    console.error('Message:', error.message); // ej: "Credenciales inválidas"
  }
}
```

### Errores posibles:

- **status 400**: Datos inválidos (email mal formato, contraseña débil, etc.)
- **status 401**: No autenticado (credenciales incorrectas)
- **status 403**: No autorizado (API key inválida)
- **status 404**: Recurso no encontrado
- **status 409**: Conflicto (email ya registrado, token ya usado)
- **status 429**: Demasiadas peticiones (rate limit)
- **status 0**: Error de red (no se pudo conectar al servidor)

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
