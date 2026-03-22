import { useState, useCallback, useRef } from "react";

const SYNTHWAVE_COLORS = [
  "#00fff7","#ff4080","#ffe600","#bf5fff","#00ff9d",
  "#ff8c00","#ff00ff","#00bfff","#39ff14","#ff6b6b",
  "#7b2fff","#ffb347","#00ffcc","#ff1493","#ffd700",
  "#4169e1","#ff69b4","#00ced1","#adff2f","#ff4500",
  "#da70d6","#7fffd4","#ff7f50","#40e0d0","#ee82ee",
  "#f0e68c","#87ceeb","#dda0dd","#98fb98","#ffa07a",
];

const LANG_COLORS = {
  JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3572a5",
  Java:"#b07219","C++":"#f34b7d",C:"#a8b9cc","C#":"#178600",
  Ruby:"#701516",Go:"#00add8",Rust:"#dea584",PHP:"#4f5d95",
  Swift:"#f05138",Kotlin:"#a97bff",Dart:"#00b4ab",HTML:"#e34c26",
  CSS:"#563d7c",SCSS:"#c6538c","Jupyter Notebook":"#da5b0b",
  Shell:"#89e051",Vue:"#41b883",Svelte:"#ff3e00",Lua:"#000080",
  Perl:"#0298c3",Scala:"#dc322f",Haskell:"#5e5086",Elixir:"#6e4a7e",
  Clojure:"#db5855",R:"#198ce7",MATLAB:"#e16737",Makefile:"#427819",
  Dockerfile:"#384d54",PowerShell:"#012456",Vim:"#199f4b",
  CoffeeScript:"#244776",Erlang:"#b83998",OCaml:"#3be133",
  "F#":"#b845fc",Nim:"#ffc200",Crystal:"#000100",Zig:"#ec915c",
  Objective-C:"#438eff","Objective-C++":"#6866fb",Assembly:"#6e4c13",
};

function escapeXml(str){
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function generateSVG(langs, username){
  const W = 700;
  const PADDING_X = 28;
  const PADDING_TOP = 72;
  const PADDING_BOT = 30;
  const BAR_H = 18;
  const GAP = 9;
  const LABEL_W = 150;
  const BAR_AREA = W - PADDING_X*2 - LABEL_W - 70;
  const ROW_H = BAR_H + GAP;
  const CONTENT_H = langs.length * ROW_H;
  const H = PADDING_TOP + CONTENT_H + PADDING_BOT;
  const maxPct = parseFloat(langs[0]?.pct || 1);

  const gridCols = Array.from({length:18},(_,i)=>
    `<line x1="${i*42}" y1="0" x2="${i*42}" y2="${H}" stroke="#00fff7" stroke-width="0.4" opacity="0.035"/>`
  ).join("");
  const gridRows = Array.from({length:Math.ceil(H/36)},(_,i)=>
    `<line x1="0" y1="${i*36}" x2="${W}" y2="${i*36}" stroke="#00fff7" stroke-width="0.4" opacity="0.035"/>`
  ).join("");

  const bars = langs.map((lang,i)=>{
    const y = PADDING_TOP + i * ROW_H;
    const bx = PADDING_X + LABEL_W;
    const bw = Math.max(2, (parseFloat(lang.pct)/maxPct)*BAR_AREA);
    const delay = (i*0.025).toFixed(3);
    const col = lang.color;
    const animId = `b${i}`;
    return [
      `<text x="${PADDING_X + LABEL_W - 8}" y="${y + BAR_H/2 + 4.5}" font-family="'Courier New',monospace" font-size="11.5" fill="#c8c8c8" text-anchor="end" dominant-baseline="auto">${escapeXml(lang.name)}</text>`,
      `<rect x="${bx}" y="${y}" width="${bw}" height="${BAR_H}" rx="2" fill="${col}" opacity="0.88"`,
      ` style="transform-box:fill-box;transform-origin:left center;transform:scaleX(0);animation:${animId} 0.55s ${delay}s cubic-bezier(0.22,1,0.36,1) forwards"/>`,
      `<text x="${bx + bw + 7}" y="${y + BAR_H/2 + 4.5}" font-family="'Courier New',monospace" font-size="10.5" fill="${col}" dominant-baseline="auto" opacity="0.9" style="animation:${animId}_t 0.3s ${(parseFloat(delay)+0.45).toFixed(3)}s ease-out both">${lang.pct}%</text>`
    ].join("");
  }).join("\n");

  const keyframes = langs.map((lang,i)=>{
    const bw = Math.max(2,(parseFloat(lang.pct)/maxPct)*BAR_AREA);
    return `@keyframes b${i}{from{transform:scaleX(0)}to{transform:scaleX(1)}}` +
           `@keyframes b${i}_t{from{opacity:0;transform:translateX(-6px)}to{opacity:0.9;transform:translateX(0)}}`;
  }).join("\n");

  const totalLangs = langs.length;
  const topLang = langs[0]?.name || "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<style>
${keyframes}
@keyframes pulse{0%,100%{opacity:0.7}50%{opacity:1}}
@keyframes scanline{0%{transform:translateY(-${H}px)}100%{transform:translateY(${H}px)}}
.blink{animation:pulse 3s ease-in-out infinite;}
</style>
</defs>
<rect width="${W}" height="${H}" fill="#070d0d"/>
${gridCols}${gridRows}
<rect x="1.5" y="1.5" width="${W-3}" height="${H-3}" rx="7" fill="none" stroke="#00fff7" stroke-width="1" opacity="0.45"/>
<rect x="3.5" y="3.5" width="${W-7}" height="${H-7}" rx="5" fill="none" stroke="#00fff7" stroke-width="0.5" opacity="0.12"/>
<line x1="22" y1="58" x2="${W-22}" y2="58" stroke="#00fff7" stroke-width="0.5" opacity="0.35"/>
<line x1="22" y1="60" x2="${W-22}" y2="60" stroke="#ff4080" stroke-width="0.3" opacity="0.25"/>
<text x="${W/2}" y="26" font-family="'Courier New',monospace" font-size="15" font-weight="bold" fill="#00fff7" text-anchor="middle" letter-spacing="5" class="blink">LANGUAGE STATS</text>
<text x="${W/2}" y="46" font-family="'Courier New',monospace" font-size="10" fill="#ff4080" text-anchor="middle" letter-spacing="2">@${escapeXml(username)} · ${totalLangs} languages detected · top: ${escapeXml(topLang)}</text>
${bars}
<line x1="22" y1="${H-18}" x2="${W-22}" y2="${H-18}" stroke="#ff4080" stroke-width="0.4" opacity="0.3"/>
<text x="${W/2}" y="${H-6}" font-family="'Courier New',monospace" font-size="8" fill="#303030" text-anchor="middle" letter-spacing="1">github.com/${escapeXml(username)}</text>
</svg>`;
}

export default function App(){
  const [username,setUsername]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [progress,setProgress]=useState("");
  const [svgContent,setSvgContent]=useState("");
  const [langs,setLangs]=useState([]);
  const [skipForks,setSkipForks]=useState(true);
  const [copied,setCopied]=useState(false);
  const abortRef=useRef(null);

  const fetchLangs=useCallback(async()=>{
    if(!username.trim())return;
    setLoading(true);setError("");setSvgContent("");setLangs([]);
    const ctrl=new AbortController();abortRef.current=ctrl;
    try{
      let allRepos=[];let page=1;
      while(true){
        setProgress(`Fetching repos — page ${page}…`);
        const res=await fetch(`https://api.github.com/users/${username.trim()}/repos?per_page=100&page=${page}&type=owner`,{signal:ctrl.signal});
        if(!res.ok){
          if(res.status===404)throw new Error("User not found");
          if(res.status===403)throw new Error("GitHub rate limit hit — wait ~1 min and retry");
          throw new Error(`GitHub API error ${res.status}`);
        }
        const repos=await res.json();
        allRepos=[...allRepos,...repos];
        if(repos.length<100)break;
        page++;
      }
      const filtered=skipForks?allRepos.filter(r=>!r.fork):allRepos;
      const langTotals={};
      const BATCH=8;
      for(let i=0;i<filtered.length;i+=BATCH){
        if(ctrl.signal.aborted)return;
        const chunk=filtered.slice(i,i+BATCH);
        setProgress(`Scanning ${i+1}–${Math.min(i+BATCH,filtered.length)} of ${filtered.length} repos…`);
        await Promise.all(chunk.map(async repo=>{
          try{
            const r=await fetch(`https://api.github.com/repos/${username.trim()}/${repo.name}/languages`,{signal:ctrl.signal});
            if(!r.ok)return;
            const d=await r.json();
            for(const[l,b]of Object.entries(d)){langTotals[l]=(langTotals[l]||0)+b;}
          }catch{}
        }));
      }
      const total=Object.values(langTotals).reduce((a,b)=>a+b,0);
      if(total===0)throw new Error("No language data found on this account");
      const sorted=Object.entries(langTotals)
        .sort(([,a],[,b])=>b-a)
        .map(([name,bytes],i)=>({
          name,bytes,
          pct:((bytes/total)*100).toFixed(2),
          color:LANG_COLORS[name]||SYNTHWAVE_COLORS[i%SYNTHWAVE_COLORS.length]
        }));
      setLangs(sorted);
      setSvgContent(generateSVG(sorted,username.trim()));
      setProgress("");
    }catch(e){
      if(e.name!=="AbortError")setError(e.message);
    }finally{setLoading(false);}
  },[username,skipForks]);

  const download=()=>{
    const blob=new Blob([svgContent],{type:"image/svg+xml"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;
    a.download=`${username.trim()}-langs.svg`;a.click();
    URL.revokeObjectURL(url);
  };

  const copyMd=()=>{
    const md=`<img width="100%" src="${username.trim()}-langs.svg" alt="${username.trim()} language stats"/>`;
    navigator.clipboard.writeText(md).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
  };

  const cancel=()=>{abortRef.current?.abort();setLoading(false);setProgress("");};

  return(
    <div style={{background:"#070d0d",minHeight:"100vh",fontFamily:"'Courier New',monospace",color:"#c8c8c8",padding:"24px"}}>
      <div style={{maxWidth:740,margin:"0 auto"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:20,fontWeight:"bold",color:"#00fff7",letterSpacing:6,marginBottom:6}}>
            LANGUAGE CARD GENERATOR
          </div>
          <div style={{fontSize:11,color:"#ff4080",letterSpacing:2}}>
            ALL LANGUAGES · SYNTHWAVE THEME · GITHUB PROFILE
          </div>
        </div>

        {/* Input area */}
        <div style={{border:"1px solid #00fff740",borderRadius:6,padding:"16px 20px",marginBottom:20,background:"#0a1414"}}>
          <div style={{display:"flex",gap:10,marginBottom:12,alignItems:"center"}}>
            <span style={{color:"#ff4080",fontSize:13}}>@</span>
            <input
              value={username}
              onChange={e=>setUsername(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!loading&&fetchLangs()}
              placeholder="github-username"
              style={{flex:1,background:"#070d0d",border:"1px solid #00fff730",borderRadius:4,
                padding:"8px 12px",color:"#00fff7",fontFamily:"inherit",fontSize:13,outline:"none"}}
            />
            {!loading
              ?<button onClick={fetchLangs} style={{background:"#00fff7",color:"#070d0d",border:"none",
                  borderRadius:4,padding:"8px 18px",fontFamily:"inherit",fontSize:12,fontWeight:"bold",
                  cursor:"pointer",letterSpacing:1}}>SCAN</button>
              :<button onClick={cancel} style={{background:"#ff4080",color:"#070d0d",border:"none",
                  borderRadius:4,padding:"8px 14px",fontFamily:"inherit",fontSize:12,fontWeight:"bold",cursor:"pointer"}}>STOP</button>
            }
          </div>
          <label style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:"#808080",cursor:"pointer",userSelect:"none"}}>
            <input type="checkbox" checked={skipForks} onChange={e=>setSkipForks(e.target.checked)}
              style={{accentColor:"#ff4080",width:13,height:13}}/>
            Skip forked repos (recommended — saves API calls)
          </label>
        </div>

        {/* Progress / Error */}
        {loading&&progress&&(
          <div style={{fontSize:11,color:"#ffe600",marginBottom:14,padding:"8px 14px",
            border:"1px solid #ffe60030",borderRadius:4,background:"#0d0d00"}}>
            ▶ {progress}
          </div>
        )}
        {error&&(
          <div style={{fontSize:12,color:"#ff4080",marginBottom:14,padding:"8px 14px",
            border:"1px solid #ff408040",borderRadius:4,background:"#1a0008"}}>
            ✕ {error}
          </div>
        )}

        {/* Preview */}
        {svgContent&&(
          <>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,color:"#404040",marginBottom:8,letterSpacing:1}}>PREVIEW</div>
              <div style={{border:"1px solid #00fff720",borderRadius:6,overflow:"hidden"}}>
                <img src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`}
                  width="100%" alt="language card preview"/>
              </div>
            </div>

            {/* Stats summary */}
            <div style={{display:"flex",gap:16,marginBottom:16,flexWrap:"wrap"}}>
              {[
                {label:"LANGUAGES",val:langs.length},
                {label:"TOP LANG",val:langs[0]?.name},
                {label:"2ND LANG",val:langs[1]?.name||"—"},
                {label:"TOP %",val:langs[0]?.pct+"%"},
              ].map(({label,val})=>(
                <div key={label} style={{flex:"1 1 120px",background:"#0a1414",border:"1px solid #00fff720",
                  borderRadius:4,padding:"10px 14px"}}>
                  <div style={{fontSize:9,color:"#ff4080",letterSpacing:1,marginBottom:4}}>{label}</div>
                  <div style={{fontSize:15,color:"#00fff7",fontWeight:"bold"}}>{val}</div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
              <button onClick={download} style={{flex:1,background:"#00fff7",color:"#070d0d",border:"none",
                borderRadius:4,padding:"10px",fontFamily:"inherit",fontSize:12,fontWeight:"bold",
                cursor:"pointer",letterSpacing:1}}>
                ↓ DOWNLOAD SVG
              </button>
              <button onClick={copyMd} style={{flex:1,background:copied?"#ffe600":"transparent",color:copied?"#070d0d":"#00fff7",
                border:"1px solid #00fff740",borderRadius:4,padding:"10px",fontFamily:"inherit",fontSize:12,
                fontWeight:"bold",cursor:"pointer",letterSpacing:1,transition:"all 0.2s"}}>
                {copied?"✓ COPIED!":"⧉ COPY MARKDOWN"}
              </button>
            </div>

            {/* Install instructions */}
            <div style={{border:"1px solid #ffffff10",borderRadius:6,padding:"14px 18px",
              background:"#0a0a0a",fontSize:11,lineHeight:1.8}}>
              <div style={{color:"#ffe600",letterSpacing:1,marginBottom:8,fontSize:10}}>HOW TO USE</div>
              <div style={{color:"#808080"}}>
                <span style={{color:"#00fff7"}}>1.</span> Download the SVG → upload to your GitHub profile repo
                <span style={{color:"#404040"}}> (github.com/<b style={{color:"#c8c8c8"}}>{username}</b>/<b style={{color:"#c8c8c8"}}>{username}</b>)</span>
              </div>
              <div style={{color:"#808080"}}><span style={{color:"#00fff7"}}>2.</span> Paste the markdown below into your README.md</div>
              <div style={{marginTop:8,background:"#0d0d0d",border:"1px solid #ffffff10",
                borderRadius:4,padding:"8px 12px",color:"#ffe60090",fontSize:10,wordBreak:"break-all"}}>
                {`<img width="100%" src="${username.trim()}-langs.svg" alt="${username.trim()} language stats"/>`}
              </div>
            </div>
          </>
        )}

        {/* Language list (collapsed table) */}
        {langs.length>0&&(
          <div style={{marginTop:16,border:"1px solid #ffffff08",borderRadius:6,overflow:"hidden"}}>
            <div style={{background:"#0a1414",padding:"8px 14px",fontSize:10,color:"#404040",letterSpacing:1,
              display:"flex",gap:0}}>
              <span style={{flex:"0 0 44px"}}>#</span>
              <span style={{flex:1}}>LANGUAGE</span>
              <span style={{flex:"0 0 80px",textAlign:"right"}}>PERCENTAGE</span>
            </div>
            <div style={{maxHeight:280,overflowY:"auto"}}>
              {langs.map((l,i)=>(
                <div key={l.name} style={{display:"flex",alignItems:"center",gap:0,
                  padding:"5px 14px",borderTop:"1px solid #ffffff05",
                  background:i%2===0?"#080808":"transparent",fontSize:11}}>
                  <span style={{flex:"0 0 44px",color:"#404040"}}>{i+1}</span>
                  <span style={{flex:1,color:"#c8c8c8",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:l.color,
                      display:"inline-block",flexShrink:0}}/>
                    {l.name}
                  </span>
                  <span style={{flex:"0 0 80px",textAlign:"right",color:l.color,fontWeight:"bold"}}>{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rate limit note */}
        <div style={{marginTop:20,fontSize:10,color:"#303030",textAlign:"center",lineHeight:1.8}}>
          GitHub public API: 60 req/hr unauthenticated · large accounts may hit limits
        </div>
      </div>
    </div>
  );
}
