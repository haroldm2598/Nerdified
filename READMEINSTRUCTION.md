Techstack

- Nextjs
- Typescript
- PrismaORM
- Supabase(Postgresql purpose)
- Clerk Auth
- Shadcn/ui
- Vapi ai(voice ai)
- Vercel Blob
- Vercel(deployment also for blob)

===================================================
this is the way we should use a function for page and components

```typescript
    export default function PAGE/COMPONENT() {
        return (
            <div>sample</div>
        )
    }
```

for using a resuable libraries or custom

```typescript
    export const useLib = () => {
        return {
            .......
        }
    }
```

inorder to make the supabase and prismaORM connected may need to use this in prisma version 7 as well using the .env not the .env.local

```typescript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: env("DIRECT_URL"),
        // shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
    },
});
```

===================================================

- inorder to make wakeup the dabatase supabase may need to awake in supabase using my own account only last 7days if not using
- im using vapi.ai as my voice ai needs in the app
- i did use a API route handler even thought i can use actions but for this app i want to dive more in API route hanlder than a server actions directly using like prismaORM
- the way i use API Route handler is this inorder to connect
  -- /lib/repositories/post.repository.ts
  -- /lib/services/post.service.ts
  -- /app/api/post/route.ts
  -- /lib/hooks/useFetchPost.ts
  --- inorder to reduce reduduncy calling

===================================================

- if you want to use vercel blob to store image for supabase may need this setup

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "sample.com" },
            {
                protocol: "https",
                hostname: "inside the supabase table or vercel blob",
            },
        ],
    },
};

export default nextConfig;
```
