<h1 align="center">⚽ Esportes A - Blog</h1>

<p align="center">
Um blog moderno focado em esportes, feito com Next.js, Prisma e PostgreSQL.
</p>

---

## 📜 Descrição do Projeto

Este projeto é um Blog criado para atender a uma necessidade real: oferecer a uma pessoa um espaço próprio para compartilhar ideias, experiências e construir sua rede. Enquanto o administrador tem controle para criar os posts, os demais usuários podem interagir curtindo e comentando.

---

## **🚀 Tecnologias Utilizadas**

### Framework & Linguagens

- **Next.js** (App Router + Server Actions)
- **React 19**
- **TypeScript 5**
- **ESLint** (padronizaão e boas práticas)
- **TailwindCSS**
- **Shadcn/ui**
- **lucide-react**
- **Prisma ORM**
- **PostgreSQL**
- **jose** (geração e verificação de JWT)
- **JWT (autenticação)**
- **react-hook-form**
- **Zod (validação)**
- **bcryptjs (hash de senha)**
- **Supabase Storage** (upload de imagens)

---

## 📦 Funcionalidades

- Cadastro e login com JWT
- Sessões persistentes e seguras via cookies
- Criação e edição de posts (apenas ADMIN)
- Curtir e comentar posts (usuários logados)
- Atualização de perfil e avatar
- Upload de imagens para o Supabase
- Sistema de categorias para os posts
- Controle de permissões com roles (`ADMIN` | `NORMAL`)
- Revalidação de dados em tempo real (Server Actions)

---

## Backend

### 🧩 Models Principais

### 📌 User

```json
{
  "id": "uuid",
  "userName": "admin_user",
  "email": "admin@example.com",
  "role": "ADMIN",
  "picture": "https://example.com/avatar.jpg",
  "createdAt": "2023-11-01T12:00:00.000Z",
  "updatedAt": "2023-11-01T12:00:00.000Z",
  "likedPostCount": 5,
  "Comments": [],
  "Posts": [],
  "Likes": []
}
```

### 📌 Post
```json
{
  "id": "uuid",
  "title": "Introdução ao Prisma ORM",
  "content": "...",
  "userId": "uuid",
  "viewCount": 150,
  "likeCount": 25,
  "createdAt": "2023-11-01T12:00:00.000Z",
  "updatedAt": "2023-11-01T12:00:00.000Z",
}
```
### 📌 Role (Enum)
```json
"ADMIN" | "NORMAL"
```
## 🔐 Autenticação JWT

<p align="justify">
A autenticação da aplicação é baseada em tokens JWT. Ao realizar o login, o servidor cria uma sessão criptografada que é armazenada em um cookie HTTP-only, garantindo maior segurança e controle.
</br></br>
Os cookies utilizados são httpOnly e secure, o que impede o acesso via JavaScript no client side e garante a transmissão segura via HTTPS.
</p>

---

### Principais funções (session.ts):

- **encrypt(payload):** Cria um JWT com userId, expiresAt e role.

- **decrypt(token):** Verifica e retorna os dados do token.

- **createSession(userId):** Cria e armazena o token nos cookies.

- **isSessionValid():** Verifica validade do token.

- **deleteSession():** Remove o cookie session.

## ⚙️ Server Actions (Next.js)

A lógica de backend é protegida e isolada no servidor utilizando as **Server Actions** do Next.js App Router. Todo o processamento sensível — como autenticação, manipulação de dados e regras de negócio — ocorre exclusivamente no servidor.

---

### 📝 Registro

- ✅ Validação de dados com **Zod**
- 🔒 Hash de senha com **bcryptjs**
- 🛠 Criação do usuário via **Prisma**
- 🔐 Autenticação automática após cadastro (sessão JWT salva nos cookies)

---

### 🔑 Login

- 🔎 Busca do usuário pelo **e-mail**
- 🔒 Verificação da senha com **bcryptjs**
- 🪪 Criação de sessão via JWT armazenada em cookies `HTTP-only` e `secure`

---

### ✏️ Criação de Post

- ✅ Validação dos dados com **Zod**
- 🧠 Verificação se a categoria já existe (evita duplicação)
- 📬 Criação do post com **Prisma**
- 👤 Associação automática do post ao autor logado
- 🔁 Revalidação do conteúdo em tempo real com `revalidatePath`

---

### 🧑 Atualização de Perfil

- ✅ Validação dos campos (opcional e individual)
- ✏️ Atualização apenas dos dados enviados
- 📦 Campos: `userName`, `bio`, `picture`, etc.

---

### 🖼 Atualização de Avatar

- 📤 Upload da imagem compactada usando **browser-image-compression**
- ☁️ Envio da imagem para o **Supabase Storage**
- 🌐 Geração da URL pública da imagem
- 🧽 Substituição do avatar anterior por um novo

---

### 💬 Comentários

- 👥 Apenas usuários autenticados podem comentar
- 💬 Comentário é associado ao post e ao autor
- 🔁 Revalidação automática da página após novo comentário

---

### ❤️ Likes

- 👍 Curtir e descurtir disponível para usuários logados
- 🔄 Contador de likes atualizado em tempo real
- 🔍 Verificação se o post já foi curtido anteriormente
- 🧠 Sistema impede múltiplos likes do mesmo usuário em um único post

---

## 🧱 Middleware de Autenticação (Next.js)

O middleware protege rotas privadas e redireciona usuários não autenticados para a página de login. Ele é executado automaticamente em todas as rotas, exceto arquivos estáticos e páginas públicas.

---

### 🔓 Rotas Públicas

- / (home)
- /login
- /register
- /post e qualquer rota que comece com /post/

Essas rotas são acessíveis sem necessidade de autenticação.

---

### 🔒 Rotas Privadas

- Verifica se a rota atual não é pública
- Usa a função isSessionValid() para checar se há uma sessão válida
- Caso não haja sessão, redireciona para /login
- Se estiver autenticado, permite o acesso normalmente

---

### 🚦 Fluxo do Middleware

- Verifica se a rota é pública (publicRoutes)
- Permite acesso a rotas dinâmicas de post (/post/slug)
- Se a rota for privada:
  - Valida sessão com isSessionValid()
  - Se inválida, redireciona para /login
  - Se válida, segue normalmente

---

## 🎨 Frontend

O frontend do projeto foi desenvolvido com foco em um **design moderno, limpo e funcional**, utilizando as melhores práticas de UX/UI para proporcionar uma experiência fluida, responsiva e intuitiva. Aliando a performance do Next.js com o ecossistema React 19 e a flexibilidade do TailwindCSS, a interface garante rapidez e beleza em qualquer dispositivo.

---

### 📄 Páginas Principais

- `/` – Página inicial com feed de posts
- `/login` – Tela de login moderna e objetiva
- `/register` – Tela de cadastro com validação clara
- `/profile` – Área administrativa exclusiva para o ADMIN
- `/post/[id]` – Página detalhada do post com interações em tempo real

---

## Principais Componentes

### 🧭 Navigation
- Filtro por categoria (dropdown mobile, scroll desktop)
- Gerenciado via contexto global

### 🧩 Header
- Exibe avatar e nome do usuário
- Menu com opções de perfil para admin
- Edição via `Sheet` para perfil normal

### 📰 Posts
- Grid responsivo com previews dos posts
- Filtro por categoria ativa

### 💬 DialogPost
- Modal para criar ou editar posts
- Controlado por contexto (`usePostForm`)

### ✍️ PostForm
- Validação com Zod + React-Hook-Form
- Campos: título, categoria e conteúdo
- Criação ou edição com feedback via `toast`

---

### ✨ Estilo Visual

- Design moderno, minimalista e coerente
- Estilização com **TailwindCSS** para agilidade e consistência
- Componentes acessíveis e elegantes com **Shadcn/ui**
- Ícones dinâmicos e leves com **lucide-react**
- Transições suaves e animações discretas para uma experiência agradável

---

### 📥 Formulários e Validações

- Gerenciamento eficiente com `react-hook-form`
- Validação robusta e segura com `zod`
- Feedback instantâneo para erros nos campos
- UX otimizada para interações com teclado e dispositivos móveis

---

### 🔄 Revalidação em Tempo Real

- Revalidação automática com `revalidatePath` após interações
- Comentários e curtidas atualizados sem recarregar a página
- Atualizações refletidas instantaneamente no frontend

---

### 📱 Responsividade

- Layout 100% responsivo, adaptado a qualquer resolução
- Navegação fluida tanto em desktop quanto em mobile
- Elementos otimizados para toque e leitura em telas pequenas

---