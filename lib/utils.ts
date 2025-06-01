export function renameDuplicates(files: File[]): File[] {
  const nameCountMap = new Map<string, number>();
  const result: File[] = [];

  for (const file of files) {
    const originalName = file.name;
    let newName = originalName;

    if (nameCountMap.has(originalName)) {
      let count = nameCountMap.get(originalName)! + 1;

      const extIndex = originalName.lastIndexOf('.');
      const baseName = extIndex !== -1 ? originalName.slice(0, extIndex) : originalName;
      const ext = extIndex !== -1 ? originalName.slice(extIndex) : '';

      while (nameCountMap.has(`${baseName} (${count})${ext}`)) {
        count++;
      }

      newName = `${baseName} (${count})${ext}`;
      nameCountMap.set(originalName, count);
      nameCountMap.set(newName, 0);
    } else {
      nameCountMap.set(originalName, 0);
    }

    const renamedFile = new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    });

    result.push(renamedFile);
  }

  return result;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export function gbToBytes(gb: number): number {
  return gb * 1024 * 1024 * 1024;
}