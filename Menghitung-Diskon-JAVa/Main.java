import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JLabel;
import javax.swing.JTextField;

class Kasir
{
	private String message = "Masukkan Total Belanjaan: ";
	private String title = "Menentukan Belanjaan Diskon dengan Java";
	private String[] options = {"OK"};
	private JPanel panel = new JPanel();
	private JLabel label = new JLabel(message, null, JLabel.CENTER);
	private JTextField input = new JTextField(10);
	private boolean loop = false;
	
	private int getTotal(){
		panel.add(label);
		panel.add(input);
		do {
			JOptionPane.showOptionDialog(null, panel, title, JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
		} while (input.getText().isEmpty());
		return Integer.parseInt(input.getText());
	};
	
	private double setDiskon(int total){
		if (total >= 100000) {
			return total - (0.15 * total);
		} else if (total >= 50000 && total < 100000) {
			return total - (0.1 * total);
		} else {
			return total - (0.05 * total);
		}
	}
	
	private boolean getResult(int total, double result){
		String hasil = "Belanjaan Anda: " + total + " \n";
		if (total >= 100000) {
			hasil += "Anda mendapatkan diskon sebesar 15% \n";
		} else if (total >= 50000 && total < 100000) {
			hasil += "Anda mendapatkan diskon sebesar 10% \n";
		} else {
			hasil += "Anda mendapatkan diskon sebesar 5% \n";
		}
		hasil += "Total Keseluruhan Belanjaan anda adalah: " + (int) result + "\n";
		hasil += "Apakah anda akan berbelanja lagi?";
		int ask = JOptionPane.showConfirmDialog(null, hasil, title, JOptionPane.YES_NO_OPTION, JOptionPane.PLAIN_MESSAGE, null);
		if (ask == JOptionPane.YES_OPTION) {
			return loop = true;
		}else {
			return loop = false;
		}
	}
	
	public void getDisplay(){
		do {
			int total = getTotal();
			double diskon = setDiskon(total);
			getResult(total, diskon);
		} while (loop);
	};
}

public class Main
{
	public static void main(String[] args) {
		Kasir k = new Kasir();
		k.getDisplay();
	}
}
