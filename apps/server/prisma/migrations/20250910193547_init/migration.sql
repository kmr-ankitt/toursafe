-- CreateTable
CREATE TABLE "public"."tourist" (
    "tourist_id" SERIAL NOT NULL,
    "private_key" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phn_no" VARCHAR(15) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "dob" DATE,
    "gender" VARCHAR(10),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "kyc" BOOLEAN DEFAULT false,
    "trip_status" VARCHAR(50),

    CONSTRAINT "tourist_pkey" PRIMARY KEY ("tourist_id")
);

-- CreateTable
CREATE TABLE "public"."e_contact" (
    "contact_id" SERIAL NOT NULL,
    "tourist_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150),
    "phn_no" VARCHAR(15),
    "gender" VARCHAR(10),
    "location_id" INTEGER,
    "relation" VARCHAR(50),

    CONSTRAINT "e_contact_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "public"."location" (
    "location_id" SERIAL NOT NULL,
    "tourist_id" INTEGER,
    "timestamps" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "public"."trip" (
    "trip_id" SERIAL NOT NULL,
    "tourist_id" INTEGER,
    "dept_id" INTEGER,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "qr_code" TEXT,
    "status" VARCHAR(50),
    "location_id" INTEGER,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."feedback" (
    "feedback_id" SERIAL NOT NULL,
    "tourist_id" INTEGER,
    "rating" INTEGER,
    "comments" TEXT,
    "suggestion" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "public"."police" (
    "police_id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "area" VARCHAR(100),
    "tourist_id" INTEGER,
    "phn_no" VARCHAR(15),
    "region" VARCHAR(100),

    CONSTRAINT "police_pkey" PRIMARY KEY ("police_id")
);

-- CreateTable
CREATE TABLE "public"."alert" (
    "alert_id" SERIAL NOT NULL,
    "tourist_id" INTEGER,
    "location_id" INTEGER,
    "alert_type" VARCHAR(50),
    "status" VARCHAR(50),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "notified_police" INTEGER,
    "notified_econtact" INTEGER,
    "dept_id" INTEGER,

    CONSTRAINT "alert_pkey" PRIMARY KEY ("alert_id")
);

-- CreateTable
CREATE TABLE "public"."e_fir" (
    "fir_id" SERIAL NOT NULL,
    "tourist_id" INTEGER,
    "filed_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "police_dept" INTEGER,
    "description" TEXT,
    "location_id" INTEGER,

    CONSTRAINT "e_fir_pkey" PRIMARY KEY ("fir_id")
);

-- CreateTable
CREATE TABLE "public"."tourist_id_mapping" (
    "dept_id" INTEGER NOT NULL,
    "tourist_id" INTEGER NOT NULL,
    "name" VARCHAR(100),
    "region" VARCHAR(100),
    "phn_no" VARCHAR(15),

    CONSTRAINT "tourist_id_mapping_pkey" PRIMARY KEY ("dept_id","tourist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tourist_phn_no_key" ON "public"."tourist"("phn_no");

-- CreateIndex
CREATE UNIQUE INDEX "tourist_email_key" ON "public"."tourist"("email");

-- AddForeignKey
ALTER TABLE "public"."e_contact" ADD CONSTRAINT "e_contact_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip" ADD CONSTRAINT "trip_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip" ADD CONSTRAINT "trip_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feedback" ADD CONSTRAINT "feedback_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."police" ADD CONSTRAINT "police_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alert" ADD CONSTRAINT "alert_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alert" ADD CONSTRAINT "alert_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alert" ADD CONSTRAINT "alert_notified_police_fkey" FOREIGN KEY ("notified_police") REFERENCES "public"."police"("police_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."alert" ADD CONSTRAINT "alert_notified_econtact_fkey" FOREIGN KEY ("notified_econtact") REFERENCES "public"."e_contact"("contact_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."e_fir" ADD CONSTRAINT "e_fir_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."e_fir" ADD CONSTRAINT "e_fir_police_dept_fkey" FOREIGN KEY ("police_dept") REFERENCES "public"."police"("police_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."e_fir" ADD CONSTRAINT "e_fir_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tourist_id_mapping" ADD CONSTRAINT "tourist_id_mapping_tourist_id_fkey" FOREIGN KEY ("tourist_id") REFERENCES "public"."tourist"("tourist_id") ON DELETE CASCADE ON UPDATE CASCADE;
