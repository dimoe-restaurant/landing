// Lee un JSON de hook_input (stdin) y el repo_root (argv[2]), y responde
// "yes"/"no"/"unknown" según si tool_input.file_path cae dentro del repo.
// Normaliza separadores (\ vs /) y capitalización de drive letter (Windows)
// antes de comparar, porque git rev-parse y el path que entrega Claude Code
// pueden diferir en formato sin ser rutas distintas.
let data = "";
process.stdin.on("data", (d) => (data += d));
process.stdin.on("end", () => {
  const repoRoot = process.argv[2];
  try {
    const parsed = JSON.parse(data);
    const filePath = parsed.tool_input && parsed.tool_input.file_path;
    if (!filePath || !repoRoot) {
      process.stdout.write("unknown");
      return;
    }
    const normalize = (p) => p.split("\\").join("/").toLowerCase();
    const inside = normalize(filePath).startsWith(normalize(repoRoot));
    process.stdout.write(inside ? "yes" : "no");
  } catch {
    process.stdout.write("unknown");
  }
});
