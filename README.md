# VSL vertical

Página estática, sem dependências. No computador, o player 9:16 fica centralizado em fundo branco. No celular, ocupa a área visível da tela, preservando todo o vídeo sem cortes.

## Configurar

1. O vídeo enviado já está em `bdc/media/video.mp4` (720 × 1280, H.264 com áudio AAC, aproximadamente 38 segundos). Para trocá-lo, substitua esse arquivo.
2. Edite `bdc/config.js`: `videoSrc` é o caminho do vídeo, `nextUrl` é a URL completa do próximo site e `poster` é uma capa opcional.
3. A VSL fica em `/bdc`. Na Vercel, somente `/` redireciona com HTTP 301 para `https://iconmitsubishi.com`.
4. Execute `python3 -m http.server 3000 --bind 127.0.0.1` nesta pasta. Para publicar, envie os arquivos para uma hospedagem estática com HTTPS e suporte a MP4.

O botão é liberado depois de assistir os primeiros 50% em velocidade normal. Sem avanço para trechos não vistos, sem contar reprises e com pausa ao sair da aba. O progresso reinicia ao recarregar. O visitante pode pausar e sair a qualquer momento. A trava é de interface: proteção de acesso real à próxima etapa exige validação no servidor.

O botão é liberado aproximadamente aos 19 segundos do vídeo incluído. O destino `nextUrl` está configurado para o WhatsApp fornecido. A barra vermelha acompanha os 100% do vídeo; o botão fica verde e libera na metade.

## Verificar

`node --test tests/watch-gate.test.mjs`

Depois de inserir o vídeo, confirme reprodução com som no celular, botão bloqueado antes da metade e redirecionamento após a liberação.

A entrada reproduz uma prévia de até 8 segundos em loop, sem áudio e sem contar para a liberação. Ao clicar em “Clique aqui para escutar”, o vídeo reinicia do zero com áudio e a contagem começa. Se o navegador bloquear autoplay, o clique inicia normalmente.
