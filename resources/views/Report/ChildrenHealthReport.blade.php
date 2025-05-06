<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Children Beneficiaries Report</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            color: #333;
            font-size: 14px;
            margin: 40px;
            background-color: #f9f9f9;
        }

        h1, h2, h3 {
            text-align: center;
            margin-bottom: 10px;
            color: #2c3e50;
        }

        .section {
            margin-top: 40px;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        }

        p, li {
            line-height: 1.8;
            margin: 5px 0;
        }

        ul {
            margin: 10px 0 0 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background: #fff;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 10px 12px;
            text-align: left;
            font-size: 13px;
        }

        th {
            background: #f2f4f7;
            color: #34495e;
        }

        tr:nth-child(even) {
            background-color: #f9fafc;
        }

        tr:hover {
            background-color: #f0f4f8;
        }

        .label {
            padding: 4px 8px;
            font-size: 11px;
            border-radius: 4px;
            color: #fff;
            display: inline-block;
            margin-left: 6px;
        }

        .underweight { background: #e74c3c; }
        .normal { background: #2ecc71; }
        .overweight { background: #f1c40f; color: #333; }
        .obese { background: #e67e22; }

        .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 60px;
            color: #7f8c8d;
        }

        .bold {
            font-weight: 600;
        }

        .info-list {
            margin-top: 15px;
        }

        .info-list p {
            margin: 6px 0;
        }

        .header-meta {
            text-align: center;
            margin-bottom: 30px;
            color: #555;
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
    <p>This report summarizes BMI trends and beneficiary demographics across barangays.</p>

    <div class="info-list">
        <p><span class="bold">Total Children:</span> {{ $total }}</p>
        <p><span class="bold">Gender:</span> {{ $male }} Male, {{ $female }} Female</p>
        <p><span class="bold">Youngest Age:</span> {{ $youngest }} years</p>
        <p><span class="bold">Oldest Age:</span> {{ $oldest }} years</p>
        <p><span class="bold">Average BMI:</span> {{ $avgBmi }}</p>
        <p><span class="bold">BMI Trends:</span> Improved: {{ $remarkStats['Improved'] }}, Needs Improvement: {{ $remarkStats['Needs Improvement'] }}, No Change: {{ $remarkStats['No Change'] }}</p>
        <p><span class="bold">Most Common BMI Classification:</span> {{ $mostCommonBmiType }}</p>
    </div>

    <p><span class="bold">Top 3 Barangays by Beneficiaries:</span></p>
    <ul>
        @foreach($topBarangays as $barangay => $count)
            <li>{{ $barangay }} – {{ $count }} beneficiaries</li>
        @endforeach
    </ul>

    <p><span class="bold">Age Group Distribution:</span></p>
    <ul>
        @foreach($ageGroups as $label => $count)
            <li>{{ $label }} – {{ $count }} children</li>
        @endforeach
    </ul>
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
                <th>Remark</th>
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
