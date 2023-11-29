# Load all sql files and run them in a postgres database

$Hostname = Read-Host -Prompt 'Hostname'
$Database = Read-Host -Prompt 'Database'
$Username = Read-Host -Prompt 'Username'
$Password = Read-Host -Prompt 'Password'

# Set password environment locally in script
$env:PGPASSWORD = $Password

$CurrentFolder = Split-Path -Parent $MyInvocation.MyCommand.Path
$CurrentFolderSqlFiles = Join-Path -Path $CurrentFolder -ChildPath '*.sql'

$Files = Get-ChildItem -Recurse -Path $CurrentFolderSqlFiles


# Run all scripts 10 times
for ($i = 0; $i -lt 10; $i++) {
	foreach ($File in $Files) {
		Write-Host "Running $File"

		try {
			psql -w -h $Hostname -d $Database -U $UserName -f $File
		} catch {
			Write-Host "Failed to run $File"
			Write-Host $_.Exception.Message
			break
		}
	}
}
