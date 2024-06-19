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
        Schema::create('packages', function (Blueprint $table) {
            $table->string('hawb')->primary();
            $table->string('manifest');
            $table->foreign('manifest')->references('code')->on('manifests')->onDelete('cascade');
            $table->integer('pieces')->default(1);
            $table->decimal('weight_kg', 10, 2);
            $table->decimal('weight_lb', 10, 2);
            $table->string('description_english');
            $table->string('description_spanish');
            $table->string('shipper');
            $table->string('consing')->unique();
            $table->foreign('shipper')->references('name')->on('clients')->onDelete('cascade');
            $table->foreign('consing')->references('name')->on('clients')->onDelete('cascade');
            $table->integer('custom_value');
            $table->string('type_bag');
            $table->string('atendend');
            $table->integer('bag');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
