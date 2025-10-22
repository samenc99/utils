# Arquitetura do Projeto

## Visão Geral

Este projeto segue uma **arquitetura em camadas limpa** (Clean Architecture), organizando o código em camadas bem definidas com responsabilidades específicas. A estrutura promove separação de responsabilidades, testabilidade e manutenibilidade.

## Estrutura das Camadas

```
src/
├── api/          # Camada de Apresentação (Entry Point)
├── queue/        # Camada de Processamento Assíncrono (Entry Point)
├── application/  # Camada de Aplicação (Regras de Negócio)
├── database/     # Camada de Dados (Acesso ao Banco e Validação de Dados)
└── shared/       # Camada Compartilhada (Utilitários)
```

---

## 1. Camada API (`src/api/`)

### Responsabilidades
- **Ponto de entrada** principal do sistema via HTTP
- Manipulação de requisições e respostas HTTP
- Validação de entrada e formatação de saída
- Orquestração entre serviços

### Estrutura
```
api/
├── {domain}/
│   ├── {domain}.controller.ts    # Controladores HTTP
│   ├── dto/                     # Data Transfer Objects
│   └── service/                 # Serviços da camada API
│       └── {action}/
│           └── {action}.service.ts
├── dto/                         # DTOs compartilhados
└── middleware/                  # Middlewares (auth, error, etc.)
```

### Padrões Implementados

#### Controllers
- **Padrão Singleton**: Cada controller é um singleton
- **Injeção de Dependência**: Controllers recebem services via construtor
- **Responsabilidade**: Apenas manipulação HTTP, delega lógica para services

```typescript
@Injectable()
export class {Domain}Controller {
   constructor(
           private readonly {action}Service: {Action}Service,
           // ...outros serviços
   ) {
   }

   @Post()
   @ApiCreatedResponse({ type: TUser })
   async {action}(@Body() body: T{Domain}{Action}Dto) {
      return await this.{action}Service.execute({
         body: request.body
      });
   }
}
```

#### Services (Camada API)
- **Orquestração**: Coordenam validators, use cases e utilitários
- **Validação de Dados**: Chamam validators da camada database
- **Fluxo**: Service → Database Validator → Application Use Case → Shared Utils

```typescript
export class {Action}Service {
  async execute({ body, jwtSign }) {
    // 1. Validação de dados via database validators
    await this.{domain}Validator.notExistsByEmail({ email: body.email });
    
    // 2. Execução de regras de negócio (criação do usuário) via application use case
    const user = await this.{domain}{Action}UseCase.execute({ ...body });
    
    // 3. Execução de regras de negócio (criação do payload) via application use case
    const payload = await this.{domain}{Action}Usecase.execute({ user });
    
    // 4. Operações auxiliares via shared utilities
    return { token: await generateToken({ jwtSign, payload }) };
  }
}
```

---

## 2. Camada Queue (`src/queue/`)

### Responsabilidades
- **Ponto de entrada** para processamento assíncrono
- Processamento de mensagens em fila
- Integração com sistemas externos via eventos

### Estrutura
```
queue/
├── queue.module.ts                    # Configuração central das filas
└── {domain}/
    └── {domain}.queue.module.ts       #Configuração das filas do domínio
    └── {domain}-{action}.queue.ts     # Processador específico da fila 
```
---

## 3. Camada Application (`src/application/`)

### Responsabilidades
- **Regras de negócio** e lógica de aplicação
- **Modelagem de dados** e schemas
- **Casos de uso** específicos
- **Lógica de negócio** especializada

### Estrutura
```
application/
├── entity/                 # Entity de validação e tipos (representam as entidades do banco de dados)
│   └── {domain}/
│       └── {domain}.entity.ts
├── usecase/               # Casos de uso (regras de negócio)
│   └── {domain}/
│       └── {action}/
│           └── {domain}-{action}.usecase.ts   # Aplicação da regra de negócio
│           └── {name}.helper.ts               # Atua como uma extensão do usecase, para que ele não fique muito grande.
└── business/              # Lógica de negócio específica.
    └── {domain}/
        └── {logic}/
            └── {domain}-{logic}.business.ts
```

#### Use Cases
- **Regras de negócio**: Implementam a lógica específica da aplicação
- **Interagem com Repositories**: Para persistir/recuperar dados
- **Usam Shared Utils**: Para operações comuns

```typescript
export class {Domain}{Action}UseCase {
  async execute(data: I{Domain}{Action}UseCase) {
    // Regra de negócio: hash da senha
    return this.{domain}Repository.insertUser({
      ...data,
      password: createHash(data.password), // Shared utility
    });
  }
}
```

#### Business Rules
- **Lógica específica**: Regras de negócio complexas e especializadas
- **Reutilização**: Podem ser usadas por múltiplos use cases
- **Isolamento**: Mantém regras de negócio específicas organizadas

---

## 5. Camada Database (`src/database/`)

### Responsabilidades
- **Acesso ao banco de dados**
- **Validação de dados** (existência, integridade, formato)
- **Queries** e operações de persistência
- **Abstração da camada de dados**

### Estrutura
```
database/
├── repository/                   # Repositório de dados
│   ├── database.ts         # Configuração do banco
│   └── {domain}/
│       ├── {domain}.repository.ts   # Operações CRUD por domínio
│       └── query/              # Queries complexas específicas
│           └── {query-name}.query.ts
└── validator/              # Validadores de dados
    └── {domain}/
        └── {domain}.validator.ts
```

### Validators
- **Validação de dados**: Verificações de existência, integridade
- **Não contém regras de negócio**: Apenas validações técnicas
- **Interagem com Repositories**: Para verificar dados no banco

```typescript
export class {Domain}Validator {
  constructor(private readonly {domain}Repository: {Domain}Repository) {}

  async notExistsByEmail({ email }: { email: string }) {
    const user = await this.{domain}Repository.findUserByEmailWithoutProfile({ email });
    
    if (user) {
      throw new BadRequestException('Usuário já existe');
    }
  }

  async existsById({ userId }: { userId: string }) {
    const user = await this.{domain}Repository.findUserById({ userId });
    
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    
    return user;
  }
}
```

### Repositories
- **Acesso a dados**: Operações CRUD e queries
- **Abstração do banco**: Isola detalhes de implementação
- **Queries complexas**: Separadas em arquivos específicos

---

## 6. Camada Shared (`src/shared/`)

### Responsabilidades
- **Utilitários** compartilhados entre todas as camadas
- **Serviços** comuns reutilizáveis
- **Exceções** padronizadas
- **Enums** e constantes do sistema

### Estrutura
```
shared/
├── utils/                  # Utilitários gerais
│   ├── create-hash.ts
│   ├── generate-token.ts
│   ├── generate-uuid.ts
│   └── date/
├── service/               # Serviços compartilhados
│   ├── geo-location/
│   ├── file/
│   └── payment/
├── exception/             # Exceções customizadas
│   ├── bad-request.exception.ts
│   ├── not-found.exception.ts
│   └── http.exception.ts
└── enum/                  # Enumerações
    ├── queue.enum.ts
    ├── gender.enum.ts
    └── match-status.enum.ts
```

---

## Fluxo de Dados Atualizado

### Fluxo Principal (API)
```
HTTP Request → Controller → Service → Database Validator → Application Use Case → Database Repository → Database
                    ↓              ↗                                      ↗
               Error Handler   Shared Utils                      Shared Services
```

### Fluxo Detalhado
1. **Controller** recebe requisição HTTP
2. **Service** orquestra o processamento:
   - Chama **Database Validators** para validação de dados
   - Executa **Application Use Cases** para regras de negócio
   - Usa **Shared Utils** para operações auxiliares, se necessário
3. **Use Cases** implementam regras de negócio
4. **Database Repositories** fazem acesso ao banco de dados
5. **Shared** fornece funcionalidades comuns

### Fluxo Alternativo (Queue/Lambda)
```
Queue Message/Lambda Event → Queue Handler/Lambda Function → Application Use Case → Database Repository
                                      ↓                               ↗
                               Error Handler                  Database Validator
```

---

## Princípios Arquiteturais

### 1. Separação de Responsabilidades
- Cada camada tem responsabilidades bem definidas
- Validação de dados separada de regras de negócio
- Acesso a dados isolado na camada Database

### 2. Inversão de Dependência
- Camadas superiores não dependem de implementações específicas
- Uso de interfaces para contratos
- Injeção de dependência via Singleton pattern

### 3. Consolidação Lógica
- Database layer agrupa models e validators
- Operações relacionadas a dados ficam coesas
- Facilita manutenção e evolução

### 4. Testabilidade
- Cada camada pode ser testada isoladamente
- Mocks facilitados pela separação clara
- Lógica de negócio isolada em Use Cases

---

## Padrões de Design Utilizados

- **Singleton Pattern**: Controllers, Services, Use Cases, Models, Validators
- **Dependency Injection**: Via construtor e getInstance()
- **Repository Pattern**: Repositories abstraem acesso a dados
- **Service Layer Pattern**: Services orquestram operações
- **Command Pattern**: Use Cases encapsulam operações de negócio
- **Validator Pattern**: Validators consolidados na camada database
- **Exception Handling**: Middleware centralizado de erros

---

## Tecnologias e Ferramentas

- **Framework**: NestJS (API)
- **Language**: TypeScript
- **Architecture**: Clean Architecture / Layered Architecture
- **Database**: Abstração via Repositories na camada Database
- **Queue**: Sistema de filas assíncronas
- **Error Handling**: Middleware centralizado
- **Validation**: Database validators para integridade de dados