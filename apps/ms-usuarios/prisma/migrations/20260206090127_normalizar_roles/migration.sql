/*
  Warnings:

  - You are about to drop the column `roles` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Empleado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empleado" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fechaContratacion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "roles";

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RolToUsuario" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RolToUsuario_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_name_key" ON "Rol"("name");

-- CreateIndex
CREATE INDEX "_RolToUsuario_B_index" ON "_RolToUsuario"("B");

-- AddForeignKey
ALTER TABLE "_RolToUsuario" ADD CONSTRAINT "_RolToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolToUsuario" ADD CONSTRAINT "_RolToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
