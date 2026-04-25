// app/api/healthz/route.ts (Next.js App Router)
export async function GET() {
    return new Response("OK", { status: 200 });
}