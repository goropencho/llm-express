-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "content" tsvector,
    "parsedText" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
