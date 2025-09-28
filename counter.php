<?php
// File to store the visit count
$counterFile = 'visit_count.txt';

// Create the file if it doesn't exist
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '0');
}

// Get current count
$count = (int)file_get_contents($counterFile);

// Increment the count
$count++;

// Save the new count
file_put_contents($counterFile, $count);

// Return the count as JSON
header('Content-Type: application/json');
echo json_encode(['count' => $count]);
?>