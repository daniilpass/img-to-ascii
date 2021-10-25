export const downloadBlob = (content, type, filename) => {
    const file = new Blob([content], {type: type});
    const a = document.createElement('a');
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();    
    URL.revokeObjectURL(a.href);
}