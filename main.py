import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://supabase-s6vb.onrender.com",
                   "https://athenatest-pied.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(
    supabase_url= os.getenv("SUPABASE_URL"),
    supabase_key=os.getenv("SUPABASE_KEY")
)

class Usuario(BaseModel):
    nome: str

usuarios = [{"nome": "ana"}]

@app.get("/usuarios")
def listar_usuarios():
    response = supabase.table("usuarios").select("*").order("id", desc=False).execute()
    return response.data

@app.post("/usuarios")
def cadastrar_usuario(usuario: Usuario):
    resposta = supabase.table("usuarios").insert({
        "nome": usuario.nome}).eq('id', id).execute()
    if len(resposta.data) == 0:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return resposta.data[0]

@app.put("/usuarios/{id}")
def atualizar_usuario(id: int, usuario: Usuario):
    response = supabase.table("usuarios").update({
        "nome": usuario.nome}).eq("id", id).execute()
    if len(response.data) == 0:
        raise HTTPException(status_code=404, 
                            detail="Usuário não encontrado")
    return response.data[0]

@app.delete("/usuarios/{id}")
def excluir_usuario(id: int):
    response = supabase.table(
        "usuarios").delete().eq("id", id).execute()
    if len(response) == 0:
        raise HTTPException(status_code=404, detail=
                            "Usuário não encontrado")
    return{"message": "Usuário excluído com sucesso"}