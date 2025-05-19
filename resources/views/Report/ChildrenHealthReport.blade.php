<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Children Beneficiaries Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Segoe UI', 'Inter', sans-serif;
            color: #2e3d2f;
            font-size: 14px;
            margin: 40px auto;
            max-width: 1000px;
            background-color: #f4fdf5;
            line-height: 1.6;
        }
        h1, h2, h3 {
            text-align: center;
            color: #256d42;
            margin-bottom: 10px;
        }
        .header-meta {
            text-align: center;
            font-size: 13px;
            margin-bottom: 30px;
            color: #5d6e5a;
        }
        .section {
            background: #ffffff;
            padding: 24px 28px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 128, 0, 0.05);
            margin-bottom: 30px;
        }
        .info-list p {
            margin: 6px 0;
        }
        ul {
            margin: 10px 0 0 20px;
        }
        .bold {
            font-weight: 600;
            color: #256d42;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
            font-size: 13px;
        }
        th, td {
            padding: 12px 14px;
            text-align: left;
            border: 1px solid #e0f1e7;
        }
        th {
            background: #d7f0dd;
            color: #1e4b30;
            font-weight: 600;
        }
        tr:nth-child(even) {
            background-color: #f7fcf9;
        }
        tr:hover {
            background-color: #e9f8ed;
        }
        .label {
            padding: 4px 8px;
            font-size: 11px;
            font-weight: 600;
            border-radius: 4px;
            display: inline-block;
            margin-left: 6px;
            text-transform: uppercase;
        }
        .underweight {
            background-color: #f8d7da;
            color: #a94442;
        }
        .normal {
            background-color: #b2e6c7;
            color: #1f542e;
        }
        .overweight {
            background-color: #fff3cd;
            color: #8a6d3b;
        }
        .obese {
            background-color: #f5c6a5;
            color: #944d20;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 60px;
            color: #6e826f;
            padding-top: 20px;
            border-top: 1px solid #cde9d6;
        }
    </style>
</head>
<body>

@php
    use Carbon\Carbon;

    function classifyBmi($bmi) {
        if ($bmi < 18.5) return ['Underweight', 'underweight'];
        if ($bmi < 25) return ['Normal', 'normal'];
        if ($bmi < 30) return ['Overweight', 'overweight'];
        return ['Obese', 'obese'];
    }

    $allChildrenFlat = collect($records)->flatten(1);
    $total = $allChildrenFlat->count();
    $male = $allChildrenFlat->where('gender', 'male')->count();
    $female = $allChildrenFlat->where('gender', 'female')->count();

    $remarkStats = ['Improved' => 0, 'Needs Improvement' => 0, 'No Change' => 0];
    $bmiSum = 0; $bmiCount = 0;
    $ages = [];
    $bmiTypes = ['Underweight' => 0, 'Normal' => 0, 'Overweight' => 0, 'Obese' => 0];
    $barangayCounts = [];

    foreach ($records as $address => $group) {
        $barangayCounts[$address] = count($group);

        foreach ($group as $child) {
            $birthDate = Carbon::parse($child['birth_date']);
            $age = $birthDate->age;
            $ages[] = $age;

            $recordsSorted = collect($child['record'])->sortBy('created_at');
            $first = optional($recordsSorted->first())['bmi'];
            $last = optional($recordsSorted->last())['bmi'];

            if ($first && $last) {
                if ($last > $first) $remarkStats['Improved']++;
                elseif ($last < $first) $remarkStats['Needs Improvement']++;
                else $remarkStats['No Change']++;
            }

            if ($last) {
                [$label, $class] = classifyBmi($last);
                $bmiTypes[$label]++;
                $bmiSum += $last;
                $bmiCount++;
            }
        }
    }

    sort($ages);
    $youngest = min($ages);
    $oldest = max($ages);
    $avgBmi = $bmiCount ? round($bmiSum / $bmiCount, 2) : 'N/A';
    arsort($barangayCounts);
    $topBarangays = array_slice($barangayCounts, 0, 3, true);

    $ageGroups = [
        '0–2 years' => count(array_filter($ages, fn($a) => $a <= 2)),
        '3–5 years' => count(array_filter($ages, fn($a) => $a >= 3 && $a <= 5)),
        '6–10 years' => count(array_filter($ages, fn($a) => $a >= 6 && $a <= 10)),
    ];

    $mostCommonBmiType = collect($bmiTypes)->sortDesc()->keys()->first();
@endphp

<h1>Children Beneficiaries Report</h1>
<div class="header-meta">Generated on: {{ now()->toDayDateTimeString() }}</div>

<div class="section">
    <p>This report summarizes BMI trends and demographic data of children beneficiaries across barangays.</p>

    <div class="info-list">
        <p><span class="bold">Total Beneficiaries:</span> {{ $total }}</p>
        <p><span class="bold">Gender Distribution:</span> {{ $male }} Male, {{ $female }} Female</p>
        <p><span class="bold">Age Range:</span> Youngest: {{ $youngest }} years, Oldest: {{ $oldest }} years</p>
        <p><span class="bold">Average BMI:</span> {{ $avgBmi }}</p>
        <p><span class="bold">BMI Trend Summary:</span></p>
        <ul>
            <li>Improved: {{ $remarkStats['Improved'] }}</li>
            <li>Needs Improvement: {{ $remarkStats['Needs Improvement'] }}</li>
            <li>No Change: {{ $remarkStats['No Change'] }}</li>
        </ul>
        <p><span class="bold">Most Common BMI Category:</span> {{ $mostCommonBmiType }}</p>

        <p><span class="bold">Top 3 Barangays with Most Beneficiaries:</span></p>
        <ul>
            @foreach($topBarangays as $barangay => $count)
                <li>{{ $barangay }} – {{ $count }} beneficiaries</li>
            @endforeach
        </ul>

        <p><span class="bold">Age Group Breakdown:</span></p>
        <ul>
            @foreach($ageGroups as $label => $count)
                <li>{{ $label }} – {{ $count }} children</li>
            @endforeach
        </ul>
    </div>
</div>

@foreach ($records as $address => $group)
    <div class="section">
        <h2>{{ $address }} ({{ count($group) }} Beneficiaries)</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>Gender</th>
                    <th>Latest BMI</th>
                    <th>Trend</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($group as $child)
                    @php
                        $recordsSorted = collect($child['record'])->sortBy('created_at');
                        $latestRecord = $recordsSorted->last();
                        $firstBmi = optional($recordsSorted->first())['bmi'];
                        $lastBmi = optional($latestRecord)['bmi'];
                        $bmiStatus = $lastBmi ? classifyBmi($lastBmi) : ['Unknown', ''];
                        $bmiLabel = $bmiStatus[0];
                        $bmiClass = $bmiStatus[1];

                        if ($firstBmi && $lastBmi) {
                            $remark = $lastBmi > $firstBmi ? 'Improved' : ($lastBmi < $firstBmi ? 'Needs Improvement' : 'No Change');
                        } else {
                            $remark = 'Insufficient Data';
                        }
                    @endphp
                    <tr>
                        <td>{{ $child['id'] }}</td>
                        <td>{{ $child['name'] }}</td>
                        <td>{{ $child['birth_date'] }}</td>
                        <td>{{ ucfirst($child['gender']) }}</td>
                        <td>
                            @if ($lastBmi)
                                {{ $lastBmi }}
                                <span class="label {{ $bmiClass }}">{{ $bmiLabel }}</span>
                            @else
                                N/A
                            @endif
                        </td>
                        <td>{{ $remark }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endforeach

<div class="footer">
    End of Report – {{ now()->timezone('Asia/Manila')->toDayDateTimeString() }}
</div>

</body>
</html>
