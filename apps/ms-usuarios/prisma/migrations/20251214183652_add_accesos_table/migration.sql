-- CreateTable
CREATE TABLE "Accesos" (
    "id" SERIAL NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipOrigen" TEXT NOT NULL,
    "resultado" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Accesos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accesos" ADD CONSTRAINT "Accesos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
