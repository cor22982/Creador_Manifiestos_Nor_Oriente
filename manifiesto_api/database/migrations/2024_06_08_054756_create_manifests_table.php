<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('manifests', function (Blueprint $table) {
            $table->string('code')->primary();
            $table->string('siteid');
            $table->string('arrivalairport');
            $table->string('waibilloriginator');
            $table->string('origin');
            $table->string('destiny');
            $table->string('airline_prefix');
            $table->date('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manifests');
    }
};
