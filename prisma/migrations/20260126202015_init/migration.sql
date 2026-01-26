-- CreateTable
CREATE TABLE "Reembolso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "atribuido" TEXT,
    "data" DATETIME,
    "anoReferencia" INTEGER,
    "processo" TEXT,
    "upm" TEXT,
    "beneficiario" TEXT,
    "requerente" TEXT,
    "solicitado" REAL,
    "cpfTitular" TEXT,
    "cpfTitularLimpo" TEXT,
    "distribuicao" DATETIME,
    "conformidade" DATETIME,
    "peg" TEXT,
    "especialidade" TEXT,
    "decisao" TEXT,
    "resultado" TEXT,
    "pagamento" DATETIME,
    "ob" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Reembolso_processo_idx" ON "Reembolso"("processo");

-- CreateIndex
CREATE INDEX "Reembolso_cpfTitularLimpo_idx" ON "Reembolso"("cpfTitularLimpo");

-- CreateIndex
CREATE INDEX "Reembolso_anoReferencia_idx" ON "Reembolso"("anoReferencia");
