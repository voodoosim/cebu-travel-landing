FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
ENV NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=128"
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm i -g prisma@6
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
EXPOSE 3000
CMD ["sh", "-c", "prisma db push --skip-generate && node server.js"]
