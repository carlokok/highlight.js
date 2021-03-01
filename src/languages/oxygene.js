/*
Language: Oxygene
Author: Carlo Kok <ck@remobjects.com>
Description: Oxygene is built on the foundation of Object Pascal, revamped and extended to be a modern language for the twenty-first century.
Website: https://www.elementscompiler.com/elements/default.aspx
*/

export default function(hljs) {
  const OXYGENE_KEYWORDS = {
    $pattern: /\.?\w+/,
    keyword:
    "absolute  abstract  add  and  array  as  asc  asm  aspect  assembler  assembly  async  at  autoreleasepool  await  begin  block  break  by  case  cdecl  class  const  constructor  continue  copy  create  default  delegate  deprecated  desc  destructor  distinct  div  do  downto  dynamic  each  else  empty  end  ensure  enum  equals  event  except  exit  extension  external  false  file  final  finalization  finalize  finalizer  finally  flags  for  forward  from  function  future  global  goto  group  has  helper  if  implementation  implements  implies  in  index  inherited  initialization  inline  interface  into  invariants  is  iterator  join  label  lazy  library  lifetimestrategy  locked  locking  loop  mapped  matching  method  mod  module  namespace  nested  new  nil  not  notify  nullable  of  old  on  operator  optional  or  order  otherwise  out  overload  override  packed  parallel  param  params  partial  pascal  pinned  platform  private  procedure  program  property  protected  public  published  queryable  raise  raises  read  readonly  record  reference  register  reintroduce  remove  repeat  require  resourcestring  result  reverse  safecall  sealed  select  selector  self  sequence  set  shl  shr  skip  soft  static  stdcall  step  strict  strong  take  then  threadvar  to  true  try  tuple  type  unit  unretained  unsafe  until  uses  using  var  virtual  volatile  weak  where  while  with  write  xor  yield  "
  };
  const CURLY_COMMENT = hljs.COMMENT(
    /\{/,
    /\}/,
    {
      relevance: 0
    }
  );
  const PAREN_COMMENT = hljs.COMMENT(
    '\\(\\*',
    '\\*\\)',
    {
      relevance: 10
    }
  );
  const STRING = {
    className: 'string',
    begin: '\'',
    end: '\'',
    contains: [
      {
        begin: '\'\''
      }
    ]
  };
  const CHAR_STRING = {
    className: 'string',
    begin: '(#\\d+)+'
  };
  const FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure method',
    end: '[:;]',
    keywords: 'function constructor|10 destructor|10 procedure|10 method|10',
    contains: [
      hljs.TITLE_MODE,
      {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        keywords: OXYGENE_KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING
        ]
      },
      CURLY_COMMENT,
      PAREN_COMMENT
    ]
  };
  return {
    name: 'Oxygene',
    case_insensitive: true,
    keywords: OXYGENE_KEYWORDS,
    illegal: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
    contains: [
      CURLY_COMMENT,
      PAREN_COMMENT,
      hljs.C_LINE_COMMENT_MODE,
      STRING,
      CHAR_STRING,
      hljs.NUMBER_MODE,
      FUNCTION,
      {
        className: 'class',
        begin: '=\\bclass\\b',
        end: 'end;',
        keywords: OXYGENE_KEYWORDS,
        contains: [
          STRING,
          CHAR_STRING,
          CURLY_COMMENT,
          PAREN_COMMENT,
          hljs.C_LINE_COMMENT_MODE,
          FUNCTION
        ]
      }
    ]
  };
}
