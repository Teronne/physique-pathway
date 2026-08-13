import{$,S,sb,load}from'./pp-lib.js';
import{paint}from'./pp-init-a.js';
async function boot(){let{data:{session}}=await sb.auth.getSession();if(!session)return;await sb.rpc('claim_first_owner');let{data:p,error}=await sb.from('profiles').select('*').eq('id',session.user.id).single();if(error){$('#authmsg').textContent=error.message;return}S.profile=p;$('#who').textContent=p.full_name||session.user.email;$('#role').textContent=p.role;$('#auth').classList.add('hidden');$('#app').classList.remove('hidden');await load();paint()}
$('#signin').onclick=async()=>{let{error}=await sb.auth.signInWithPassword({email:$('#email').value,password:$('#password').value});if(error){$('#authmsg').textContent=error.message;return}boot()};
$('#logout').onclick=async()=>{await sb.auth.signOut();location.reload()};
$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.add('hidden')};
boot();