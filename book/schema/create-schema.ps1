# Load all sql files and run them in a postgres database

$HostName = $args[0]
$DatabaseName = $args[1]
$UserName = $args[2]
$Password = $args[3]

# Set password environment locally in script
$env:PGPASSWORD = $Password

$Files = Get-ChildItem -Path .\*.sql -Recurse


# Run all scripts 10 times
for ($i = 0; $i -lt 10; $i++) {
		foreach ($File in $Files) {
				Write-Host "Running $File"
				psql -w -h $HostName -d $DatabaseName -U $UserName -f $File
		}
}
