export interface TableRowOption {
    label: string;
    action: (row: any) => void;
    isVisible: (row: any) => boolean;
}
