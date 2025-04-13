<h1 align="center">Esportes A - Blog</h1>

<h2>📜 Descrição do Projeto</h2>

<p align="justify">
Este projeto é um Blog criado para atender a uma necessidade real: oferecer a uma pessoa um espaço próprio para compartilhar ideias, experiências e construir sua rede. Enquanto o administrador tem controle para criar os posts, os demais usuários podem interagir curtindo e comentando.
</p>

<h2>Backend</h2>
<p>
Para o backend, utilizei o Next.js em conjunto com o banco de dados PostgreSQL, implementado através do Prisma ORM. 
</p>

### Models

<p>
Os modelos principais do banco de dados são definidos abaixo.
</p>

<p>
<strong>1. User</strong></br>
O modelo User representa os usuários da aplicação. Cada usuário pode criar comentários e curtir publicações, mas apenas usuários com o papel ADMIN podem criar ou editar os posts, fora outras permissões a mais. 
</p>

```json
{
  "id": "f47ac10b0e02",
  "userName": "admin_user",
  "email": "admin@example.com",
  "password": "$2b$10$EIXgTQZ3vLJz9WxKqYpU.eZzZzZzZzZzZzZzZzZzZz", // Senha criptografada
  "createdAt": "2023-11-01T10:00:00.000Z",
  "updatedAt": "2023-11-01T10:00:00.000Z",
  "role": "ADMIN",
  "picture": "https://example.com/avatar.jpg",
  "likedPostCount": 5,
  "Comments": [],
  "Posts": [],
  "Likes": []
}
```

<p>
<strong>2. Post</strong></br>
O modelo Post representa as publicações feitas pelos usuários.
</p>

```json
{
  "id": "b2c3d4e5lmnopqrstuvw",
  "title": "Introdução ao Prisma ORM",
  "content": "O Prisma é uma ferramenta poderosa para interagir com bancos de dados...",
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "createdAt": "2023-11-01T12:00:00.000Z",
  "updatedAt": "2023-11-01T12:00:00.000Z",
  "viewCount": 150,
  "likeCount": 25
}
```

<p>
<strong>3. ROLE</strong></br>
O enum Role define os papéis dos usuários na aplicação.
</p>

```json
{
  "role": "ADMIN" || "NORMAL"
}
```

<p>Existem outras tabelas, mas as principais são essas.</p>

## 🔐 Autenticação JWT

<p align="justify">
A autenticação da aplicação é baseada em tokens JWT. Ao realizar o login, o servidor cria uma sessão criptografada que é armazenada em um cookie HTTP-only, garantindo maior segurança e controle.
</br></br>
Os cookies utilizados são httpOnly e secure, o que impede o acesso via JavaScript no client side e garante a transmissão segura via HTTPS.
</p>

<h4>Arquivo: <span style="color: #e50200">session.ts</span></h4>

<p>
Esse arquivo centraliza toda a lógica de sessão do usuário utilizando JWT e cookies. Abaixo, uma explicação das principais funções:
</p>

#### 1. encrypt(payload)
<p> 
Cria um token JWT assinado com algoritmo HS256, com validade de 1 dia. Os dados inseridos no token são: 
</p>

• userId: ID do usuário autenticado

• expiresAt: Data de expiração do token

• role: Papel do usuário (ex: ADMIN ou NORMAL)

#### 2. decrypt(session) 
<p> 
Verifica e decodifica um token de sessão. Se o token for válido, retorna os dados do payload. Caso contrário, retorna `undefined`. 
</p>

#### 3. createSession(userId)
<p>
Toda vez que o usuário for fazer o login ele cria uma nova sessão para o usuário, armazenando um token JWT no cookie. A sessão expira em 24 horas e contém as permissões do usuário. 
</p>

#### 4. isSessionValid()
<p>
Verifica se o cookie de sessão ainda está válido. Se for true a sessão vai continuar logada, caso for false o usuário será deslogado e redirecionado para a página de login.
</p>

#### 5. deleteSession()
<p>
Quando o usuário clicar em Sair da conta ele remove a sessão do usuário deletando o cookie `session`.
</p>

## ⚙️ Server Actions
<p align="justify">
Utilizo as <strong>Server Actions</strong> do Next.js para tratar diretamente no servidor as operações essenciais da aplicação, como autenticação, criação de posts, atualização de perfil, comentários, likes, entre outras. Isso garante mais segurança, performance e organização na lógica do backend.
</p>

### Registro de usuário
• Validação de dados
Os dados enviados pelo formulário são validados com o Zod para garantir que estão no formato esperado. Se a validação falhar, a função retorna o erro.

• Hash da senha
A senha do usuário é criptografada usando bcryptjs antes de ser salva no banco de dados, garantindo segurança.

• Criação do usuário
Utiliza o Prisma para inserir o novo usuário no banco. O campo role é definido como "NORMAL" por padrão.

• Criação da sessão
Após o registro, a função createSession é chamada automaticamente para autenticar o usuário e armazenar o token JWT nos cookies e já é redirecionado para a página inicial.

### Login de usuário
• Busca do usuário
A função tenta encontrar o usuário no banco através do e-mail. Se não encontrar, retorna erro específico para o campo de e-mail.

• Validação da senha
A senha enviada é comparada com a senha criptografada armazenada usando bcrypt.compare. Se estiver incorreta, retorna erro específico.

• Sessão do usuário
Se tudo estiver certo, é criada uma sessão com JWT e armazenada nos cookies, permitindo que o usuário acesse áreas autenticadas.

• Tratamento de erro
Se ocorrer qualquer erro inesperado, é exibida uma mensagem genérica para o usuário e o erro é logado no console.


