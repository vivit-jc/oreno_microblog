export function modText(text: string){
  // 今のところリンクは一つだけ対応
  const link = text.match(/http.+/)
  if(link){
    text = text.replace(link[0],`<a target=\"_\" href=\"${link[0]}\">${link[0]}<\/a>`)
  }
  return text
}