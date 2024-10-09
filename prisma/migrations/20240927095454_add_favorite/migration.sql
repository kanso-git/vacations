-- CreateTable
CREATE TABLE "Favorite" (
    "profileId" TEXT NOT NULL,
    "porpertyId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("profileId","porpertyId")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_porpertyId_fkey" FOREIGN KEY ("porpertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
