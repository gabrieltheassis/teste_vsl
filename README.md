# VSL vertical

Página estática, sem dependências. No computador, o player 9:16 fica centralizado em fundo branco. No celular, ocupa a área visível da tela, preservando todo o vídeo sem cortes.

## Configurar

1. O vídeo enviado já está em `media/video.mp4` (1080 × 1920, H.264 com áudio AAC, aproximadamente 40 segundos). Para trocá-lo, substitua esse arquivo.
2. Edite `config.js`: `videoSrc` é o caminho do vídeo, `nextUrl` é a URL completa do próximo site e `poster` é uma capa opcional.
3. Execute `python3 -m http.server 3000 --bind 0.0.0.0` nesta pasta. Para publicar, envie os arquivos para uma hospedagem estática com HTTPS e suporte a MP4.

O botão é liberado depois de assistir os primeiros 50% em velocidade normal. Sem avanço para trechos não vistos, sem contar reprises e com pausa ao sair da aba. O progresso reinicia ao recarregar. O visitante pode pausar e sair a qualquer momento. A trava é de interface: proteção de acesso real à próxima etapa exige validação no servidor.

O botão é liberado aproximadamente aos 20 segundos do vídeo incluído. Configure `nextUrl` antes de publicar para que ele leve ao site desejado.

## Verificar

`node --test tests/watch-gate.test.mjs`

Depois de inserir o vídeo, confirme reprodução com som no celular, botão bloqueado antes da metade e redirecionamento após a liberação.
