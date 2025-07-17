<?php

namespace App\Http\Controllers\API\Parent;

use App\Http\Controllers\Controller;
use App\Models\MealPlan;

class NutritionController extends Controller
{
    public function __invoke(){
        $plans = MealPlan::latest()->get();

        return [
            'data' => $plans
        ];

    }
}
