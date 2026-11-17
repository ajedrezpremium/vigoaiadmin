# Despliega el proyecto Vercel neutro de campana (ia-administracion-local).
# Mismo codigo que vigo-ai-demo, pero la URL no delata "vigo".
#
#   powershell -File scripts/deploy-neutral.ps1
#
# Requiere VERCEL_TOKEN en el entorno.

param(
  [string]$Token = $env:VERCEL_TOKEN,
  [string]$ProjectId = "prj_YIaVQWBHnt206BqCNTCHyA05okUQ",
  [string]$OrgId = "team_IkSysRh3oy6ZVu124kMhE1zH",
  [string]$ProjectName = "ia-administracion-local"
)

$ErrorActionPreference = "Stop"
if (-not $Token) { throw "Falta VERCEL_TOKEN" }

$root = Split-Path -Parent $PSScriptRoot
$staging = Join-Path $env:TEMP "opencode\neutral"

if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }
New-Item -ItemType Directory -Force $staging | Out-Null
robocopy $root $staging /E /XD node_modules .next .git tmp .vercel /XF *.tsbuildinfo /NFL /NDL /NJH /NJS /NP | Out-Null

New-Item -ItemType Directory -Force (Join-Path $staging ".vercel") | Out-Null
@{
  projectId = $ProjectId
  orgId = $OrgId
  projectName = $ProjectName
} | ConvertTo-Json | Set-Content (Join-Path $staging ".vercel\project.json")

Push-Location $staging
try {
  npx vercel deploy --prod --yes --token=$Token 2>&1 | Select-String -Pattern "Production|Aliased|Error" | Select-Object -Last 3
} finally {
  Pop-Location
}
