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
            $table->string('siteid')->default('23');
            $table->string('arrivalairport')->default('JFK');
            $table->string('waibilloriginator')->default('F703');
            $table->string('origin')->default('GUA');
            $table->string('destiny')->default('JFK');
            $table->string('airline_prefix')->default('202');
            $table->date('date')->default(DB::raw('CURRENT_DATE'));
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
