with open('page_recovered.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('\\n', '\n').replace('\\"', '"')

with open('page_recovered_fixed.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
