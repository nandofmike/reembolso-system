module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/reembolsos/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.5_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2b$client$40$7$2e$3$2e$0_prisma$40$7$2e$3$2e$0_$40$types$2b$react$40$19$2e$2$2e$9_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$re_6724357a474f6396503e9ee8baf36c4b$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/.pnpm/@prisma+client@7.3.0_prisma@7.3.0_@types+react@19.2.9_react-dom@19.2.4_react@19.2.4__re_6724357a474f6396503e9ee8baf36c4b/node_modules/@prisma/client)");
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$prisma$2b$client$40$7$2e$3$2e$0_prisma$40$7$2e$3$2e$0_$40$types$2b$react$40$19$2e$2$2e$9_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$re_6724357a474f6396503e9ee8baf36c4b$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '25');
        const skip = (page - 1) * limit;
        const search = searchParams.get('search');
        const ano = searchParams.get('ano');
        const where = {};
        if (search) {
            where.OR = [
                {
                    processo: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    beneficiario: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    requerente: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    cpfTitular: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    cpfTitularLimpo: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    upm: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    especialidade: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    decisao: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    resultado: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    ob: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        if (ano) {
            where.anoReferencia = parseInt(ano);
        }
        const [registros, total] = await Promise.all([
            prisma.reembolso.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    data: 'desc'
                }
            }),
            prisma.reembolso.count({
                where
            })
        ]);
        const somaResult = await prisma.reembolso.aggregate({
            where,
            _sum: {
                solicitado: true
            }
        });
        const totalPages = Math.ceil(total / limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            registros,
            paginacao: {
                page,
                limit,
                total,
                totalPages
            },
            soma: somaResult._sum.solicitado || 0
        });
    } catch (error) {
        console.error('Erro ao listar:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Erro ao listar'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const data = body.data ? new Date(body.data) : null;
        const anoReferencia = data ? data.getFullYear() : null;
        const cpfTitularLimpo = body.cpfTitular ? body.cpfTitular.replace(/\D/g, '') || null : null;
        const reembolso = await prisma.reembolso.create({
            data: {
                atribuido: body.atribuido || null,
                data,
                anoReferencia,
                processo: body.processo || null,
                upm: body.upm || null,
                beneficiario: body.beneficiario || null,
                requerente: body.requerente || null,
                solicitado: body.solicitado ? parseFloat(body.solicitado) : null,
                cpfTitular: body.cpfTitular || null,
                cpfTitularLimpo,
                distribuicao: body.distribuicao ? new Date(body.distribuicao) : null,
                conformidade: body.conformidade ? new Date(body.conformidade) : null,
                peg: body.peg || null,
                especialidade: body.especialidade || null,
                decisao: body.decisao || null,
                resultado: body.resultado || null,
                pagamento: body.pagamento ? new Date(body.pagamento) : null,
                ob: body.ob || null
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(reembolso, {
            status: 201
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$5_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Erro ao criar'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__661222a8._.js.map