-- CreateTable
CREATE TABLE "Fund" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fundFamily" TEXT NOT NULL,
    "nav" DOUBLE PRECISION NOT NULL,
    "portfolioId" INTEGER NOT NULL,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fund" ADD CONSTRAINT "Fund_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
