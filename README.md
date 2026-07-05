# pyBRAS Web
 
Versão web do [pyBRAS-DCP-converter](https://github.com/shuri-IT/pyBRAS-DCP-converter). Transforma um vídeo em um arquivo de áudio especial (`.wav`) que pode ser usado no **Canal 15** de um DCP, para incluir o canal de **Libras** em exibições de cinema.
 
A diferença para a ferramenta original em Python é simples: aqui **não é preciso instalar nada**. Você abre um site, arrasta o vídeo e recebe o `.wav` de volta. A conversão inteira acontece **dentro do seu próprio navegador** — o vídeo nunca sai do seu computador ou celular.
 
> **É a mesma norma, os mesmos parâmetros e o mesmo resultado do `pyBRAS`.** Só muda a forma de rodar: em vez de terminal, é uma página web.
 
## Índice
 
- [Privacidade: por que "100% local" importa](#privacidade-por-que-100-local-importa)
- [O que esse site faz, em resumo](#o-que-esse-site-faz-em-resumo)
- [Como usar — passo a passo](#como-usar--passo-a-passo)
- [Antes de começar: como deve ser o vídeo](#antes-de-começar-como-deve-ser-o-vídeo)
- [Se aparecer um aviso sobre o formato do vídeo](#se-aparecer-um-aviso-sobre-o-formato-do-vídeo)
- [Verificar um `.wav` já pronto](#verificar-um-wav-já-pronto)
- [Prefere a linha de comando?](#prefere-a-linha-de-comando)
- [Hospedagem (para quem for publicar o site)](#hospedagem-para-quem-for-publicar-o-site)
- [Solução de problemas](#solução-de-problemas)
- [Para os nerds da codificação 🤓](#para-os-nerds-da-codificação-)
- [Créditos](#créditos)
- [Licença](#licença)
---
 
## Privacidade: por que "100% local" importa
 
Vídeos de intérprete de Libras muitas vezes são material sensível e ainda não divulgado do filme. Por isso, **nada é enviado para nenhum servidor**. Não há upload, não há cadastro e não há rastreamento.
 
A única coisa que o site baixa da internet é o próprio motor de conversão (o `ffmpeg` compilado para rodar no navegador, cerca de 32 MB) — e isso acontece **uma vez só**, ficando guardado em cache. Depois que ele carrega, você pode até **desligar a internet** e continuar convertendo normalmente.
 
Quer conferir que é local mesmo? Abra as ferramentas de desenvolvedor do navegador (tecla **F12**), vá na aba **Rede** ("Network") e faça uma conversão: você vai ver o motor sendo baixado uma vez e, depois disso, **nenhum tráfego carregando o seu vídeo**.
 
---
 
## O que esse site faz, em resumo
 
Você tem um vídeo com um(a) intérprete de Libras. O site converte esse vídeo em um arquivo `.wav` especial, que **não é um áudio normal** — é um vídeo disfarçado de áudio, para que os dispositivos de acessibilidade dos cinemas consigam exibir Libras junto com o filme.
 
Você entrega o `.wav` gerado para quem está montando o DCP do filme. Não é necessário entender os detalhes técnicos por trás disso.
 
---
 
## Como usar — passo a passo
 
1. Abra o site.
2. Na primeira vez, aguarde alguns segundos: o motor de conversão é baixado (~32 MB) e fica em cache para as próximas vezes.
3. **Arraste o vídeo** para a área indicada (ou toque nela para escolher um arquivo).
4. Confira o **preview de enquadramento** — ele mostra exatamente como o(a) intérprete vai aparecer no quadro final de 480×640, já com as tarjas pretas (se houver). Se algo estiver estranho, veja a seção de [aviso de formato](#se-aparecer-um-aviso-sobre-o-formato-do-vídeo).
5. Clique em **Converter para .wav**.
6. Acompanhe a barra de progresso. Ao terminar, o site faz uma **autoverificação** do arquivo e libera o botão de download.
7. Clique em **Baixar** e entregue o `.wav` para quem monta o DCP usar no canal 15.
> **Sobre o tempo:** a codificação roda no processador do seu próprio dispositivo, então a velocidade depende da máquina. Vídeos longos podem levar alguns minutos. Deixe a aba aberta enquanto converte.
 
---
 
## Antes de começar: como deve ser o vídeo
 
Isso evita retrabalho depois.
 
- **Formato do arquivo:** `.mp4` ou `.mov` funcionam bem. A maioria dos vídeos de celular já está em um desses formatos.
- **Formato da imagem (proporção):** o ideal é um vídeo **na vertical**, parecido com um Story do Instagram (mais alto do que largo). Se o vídeo foi gravado na horizontal (webcam widescreen, câmera de reunião), o site ainda funciona, mas vai **avisar você** antes de continuar.
- **Duração mínima:** pelo menos **2 segundos**. Vídeos mais curtos não podem ser convertidos.
Para o melhor resultado possível, o mais recomendado é preparar o vídeo antes em um editor (Premiere, DaVinci Resolve, After Effects, etc.), já exportando em **480×640, 24 fps progressivo, H.264 a 1 Mbps**, com o(a) intérprete bem enquadrado(a) e o fundo já em preto sólido. O passo a passo completo desse preparo (incluindo remoção de chroma key) está no [README do projeto original](https://github.com/shuri-IT/pyBRAS-DCP-converter#etapa-0-recomendada-preparar-o-vídeo-em-um-software-de-edição-premiere-davinci-resolve-after-effects-media-composer-etc-antes-de-converter). Se você fizer esse preparo, provavelmente nunca verá o aviso de letterbox abaixo.
 
---
 
## Se aparecer um aviso sobre o formato do vídeo
 
Se o vídeo não estiver perto da proporção retrato 3:4, o site avisa que a imagem vai ser reduzida e receber **tarjas pretas** (letterbox) para caber no quadro de 480×640. O aviso dispara quando o conteúdo útil cobriria menos de **70%** do quadro.
 
O preview ao lado do aviso mostra exatamente como vai ficar. Se o(a) intérprete ficar pequeno(a) demais, o ideal é **recortar o vídeo para uma proporção próxima de 3:4** em um editor antes de converter. Se estiver tudo bem para você, é só clicar em **Converter mesmo assim**.
 
---
 
## Verificar um `.wav` já pronto
 
O site tem um segundo modo: **"Verificar um .wav pronto"**. Ele confere se um arquivo `.wav` já existente segue a estrutura de blocos da norma ISDCF Doc13 (marcadores, tamanho de bloco, formato PCM), sem recodificar nada. É o equivalente à opção `--check` da ferramenta em Python, e também roda 100% no navegador.
 
Útil para conferir um arquivo que você recebeu de outra pessoa antes de colocá-lo no DCP.
 
---
 
## Prefere a linha de comando?
 
Se você tiver qualquer dificuldade com o site — ou precisar automatizar a conversão em lote, integrar em um pipeline, ou rodar sem navegador —, a ferramenta original em Python faz exatamente a mesma coisa pela linha de comando:
 
**➡️ [github.com/shuri-IT/pyBRAS-DCP-converter](https://github.com/shuri-IT/pyBRAS-DCP-converter)**
 
As duas produzem `.wav` idênticos em estrutura. Use a que for mais conveniente para o seu fluxo de trabalho.
 
---
 
 
## Solução de problemas
 
| Problema | O que fazer |
| --- | --- |
| O motor não carrega / trava em "Baixando o motor de conversão" | Verifique a conexão com a internet **na primeira vez** (o motor precisa ser baixado uma vez). Depois disso, funciona offline. Recarregue a página. |
| "O vídeo tem menos que um bloco de 2 s" | O vídeo é curto demais. É preciso pelo menos 2 segundos. |
| Aviso de tarjas pretas (letterbox) | O vídeo não está em proporção retrato. Veja [Se aparecer um aviso sobre o formato do vídeo](#se-aparecer-um-aviso-sobre-o-formato-do-vídeo). |
| "O navegador não conseguiu pré-visualizar este formato" | Sem problema — a conversão ainda funciona, só não dá para ver o preview antes. |
| A conversão está muito lenta | Confirme que o modo multinúcleo está ativo (veja a seção de hospedagem). Vídeos longos naturalmente levam mais tempo, pois tudo roda na sua máquina. |
| Arquivo muito grande (acima de ~2 GB) | Reexporte o vídeo em H.264 a 1 Mbps antes de converter. Isso reduz muito o tamanho sem perder qualidade útil. |
| O ffmpeg terminou com erro | O arquivo pode não ter trilha de vídeo válida ou usar um codec não suportado. Abra o "Registro técnico" na tela de erro para detalhes. |
 
Se nada resolver, abra uma issue descrevendo o que aconteceu: **navegador e versão usados**, o que apareceu na tela de erro (incluindo o registro técnico, se houver) e o formato/proporção do vídeo de origem. Não é preciso anexar o vídeo.
 
---
 
## Para os nerds da codificação 🤓
 
Esta versão web é uma porta fiel da ferramenta em Python, mantendo **exatamente os mesmos parâmetros exigidos pela norma**. O `ffmpeg` roda no navegador via WebAssembly (`ffmpeg.wasm`), executando a mesma cadeia de filtros e as mesmas flags de codificação; o empacotamento dos blocos PCM e a montagem do cabeçalho WAV são feitos em JavaScript.
 
Parâmetros:
 
```
Codec:            VP9 (libvpx-vp9)
Resolução:        480×640 (retrato, fixa)
Taxa de quadros:  24.0 fps (forçada)
Pixel format:     yuv420p
Bitrate:          576.000 bps (CBR travado: minrate = maxrate)
Chunk:            2.0 s / 48 frames
Muxer:            webm_chunk
PCM:              48.000 Hz / 24-bit / mono
Bloco PCM:        288.000 bytes (20 de cabeçalho + EBML + segmento VP9 + padding)
```
 
Cada bloco PCM de 288.000 bytes segue este layout binário (big-endian):
 
```
H1 (4 bytes) = 0xFFFFFFFF          marcador de sincronismo
Lv (4 bytes) = tamanho do segmento VP9 do chunk
Lb (4 bytes) = tamanho total do bloco (sempre 288.000)
Le (4 bytes) = tamanho do cabeçalho EBML/WebM compartilhado
H2 (4 bytes) = 0xFFFFFFFF          marcador de sincronismo
E  (Le bytes)  = cabeçalho EBML/WebM (repetido em todo bloco)
V  (Lv bytes)  = segmento VP9 daquele chunk de 2 s
P  (resto)     = zeros até completar Lb
```
 
Norma seguida: **[ISDCF Doc13 — Sign Language Video Encoding for Digital Cinema](https://github.com/ISDCF/Sign-Language-Video-Encoding)**. Este conversor é uma reimplementação independente a partir do documento público; não contém código do encoder de referência da ISDCF.
 
**Nota de desempenho:** a única diferença de parâmetro em relação ao Python é o `-speed`, ajustado para um valor mais alto (a norma não restringe isso — só restringe os parâmetros do arquivo de saída), para deixar a codificação no navegador mais rápida sem alterar o resultado exigido. A conversão multinúcleo depende de `SharedArrayBuffer`, que exige que a página seja servida com os cabeçalhos COOP/COEP — é justamente o que o `coi-serviceworker.js` fornece em hospedagens sem controle de cabeçalhos.
 
---
 
## Créditos
 
Guia e ferramenta revisados com a ajuda de **[Eduardo Pires de Vasconcelos](https://www.imdb.com/pt/name/nm10246068/)**, montador, finalizador e coordenador de pós-produção, que ajudou a identificar pontos de confusão no passo a passo e apontou detalhes técnicos de preparo de vídeo (como o processo de remoção de chroma key e exportação) importantes para quem já trabalha profissionalmente com pós-produção.
 
Baseado no projeto original **[pyBRAS-DCP-converter](https://github.com/shuri-IT/pyBRAS-DCP-converter)**.
 
---
 
## Licença
 
Distribuído sob a licença **MIT** — você pode usar, copiar, modificar e redistribuir livremente, inclusive em pipelines comerciais de masterização de DCP, desde que mantenha o aviso de copyright.
